const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const database = require("../../scripts/knex");
const jwt = require("jsonwebtoken");

// Validations
const validateUser = require("../../validation/validateUser");
const validateLoginInput = require("../../validation/validateLogin");
const validateResend = require("../../validation/validateResendEmail");
const validateEmail = require("../../validation/validateEmail");

// Send verification email utility
const sendEmail = require("../../utilities/sendEmail");

// Credentials
const { secretOrKey } = require("../../utilities/keys");

const saltRounds = 12; // higher number provides more security, but comes at the price of more computing power usage

router.post("/register", (req, res) => {
  const { errors, isValid } = validateUser(req.body);
  if (!isValid) return res.status(400).json(errors);
  let token;
  crypto.randomBytes(48, (err, buf) => {
    if (err) throw err;
    token = buf
      .toString("base64")
      .replace(/\//g, "") // '/' and '+' aren't valid in URLs
      .replace(/\+/g, "-");
  });
  bcrypt.genSalt(saltRounds, (err, salt) => {
    if (err) throw err;
    bcrypt.hash(req.body.password1, salt, (err, hash) => {
      if (err) throw err;
      database("users")
        .returning(["id", "email", "registered", "token"])
        .insert({
          email: req.body.email,
          password: hash,
          registered: Date.now(),
          token,
          token_creation_time: Date.now(),
          email_verified: "f",
          token_used_before: "f"
        })
        .then(user => {
          const to = user[0].email;
          const subject = "Please confirm your ReliefJobs account";
          /**
           * @TODO
           * Replace the PROD_HOST & PROD_PORT
           * in the .env file with final production links
           * when ready
           */
          const verificationLink = `http://${
            process.env.NODE_ENV === "production"
              ? process.env.PROD_HOST
              : process.env.DEV_HOST
          }:${
            process.env.NODE_ENV === "production"
              ? process.env.PROD_PORT
              : process.env.DEV_PORT
          }/v1/users/verify/${user[0].token}`;
          const content =
            "<body><p>Please verify your email address to finalize your ReliefJobs subscription.</p> <a href=" +
            verificationLink +
            ">Verify email</a></body>";
          sendEmail(to, subject, content);
          res.json("Verification email sent successfully");
        })
        .catch(err => {
          console.log(err);
          errors.account = "Email already registered";
          res.status(400).json(errors);
        });
    });
  });
});

router.post("/verify/:token", (req, res) => {
  const { token } = req.params;
  const errors = {};
  database
    .returning(["email", "email_verified", "token_used_before"])
    .from("users")
    .where({ token: token, token_used_before: "f" })
    .update({
      email_verified: "t",
      token_used_before: "t"
    })
    .update("updated_at", database.fn.now())
    .then(data => {
      if (data.length > 0) {
        res.json(
          "Email successfully verified! Please login to access your account"
        );
      } else {
        database
          .select("email", "email_verified", "token_used_before")
          .from("users")
          .where({ token: token })
          .then(check => {
            if (check.length > 0) {
              if (check[0].email_verified) {
                errors.alreadyVerified =
                  "Email already verified. Please login to your account";
                res.status(400).json(errors);
              }
            } else {
              errors.invalidEmail =
                "Invalid Email. Please check if you have registered with the correct email address or re-send the verification link to your email.";
              res.status(400).send(errors);
            }
          })
          .catch(err => {
            errors.db = "Invalid request";
            res.status(400).json(errors);
          });
      }
    })
    .catch(err => {
      errors.db = "Invalid request";
      res.status(400).json(errors);
    });
});

router.post("/resend_email", (req, res) => {
  const { errors, isValid } = validateResend(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  let resendToken;

  crypto.randomBytes(48, (err, buf) => {
    if (err) throw err;
    resendToken = buf
      .toString("base64")
      .replace(/\//g, "")
      .replace(/\+/g, "-");
  });

  database
    .table("users")
    .select("*")
    .where({ email: req.body.email })
    .then(data => {
      if (data.length === 0) {
        errors.invalid = "Invalid email address. Please register again!";
        res.status(400).json(errors);
      } else {
        database
          .table("users")
          .returning(["email", "token"])
          .where({ email: data[0].email, email_verified: "f" })
          .update({ token: resendToken, token_creation_time: Date.now() })
          .then(result => {
            if (result.length > 0) {
              const to = result[0].email;
              const subject = "Please confirm your ReliefJobs account";
              const resendLink = `http://${
                process.env.NODE_ENV === "production"
                  ? process.env.PROD_HOST
                  : process.env.DEV_HOST
              }:${
                process.env.NODE_ENV === "production"
                  ? process.env.PROD_PORT
                  : process.env.DEV_PORT
              }/v1/users/verify/${result[0].token}`;
              const content =
                "<body><p>Please verify your email address to finalize your ReliefJobs subscription.</p> <a href=" +
                resendLink +
                ">Verify email</a></body>";
              sendEmail(to, subject, content);
              res.json("Verification email sent successfully");
            } else {
              errors.alreadyVerified =
                "Email address has already been verified, please login.";
              res.status(400).json(errors);
            }
          })
          .catch(err => {
            errors.db = "Bad request";
            res.status(400).json(errors);
          });
      }
    })
    .catch(err => {
      errors.db = "Bad request";
      res.status(400).json(errors);
    });
});

router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  } else {
    database
      .select("id", "email", "password")
      .from("users")
      .where({ email: req.body.email, email_verified: true })
      .then(data => {
        bcrypt
          .compare(req.body.password, data[0].password)
          .then(isMatch => {
            if (isMatch) {
              const payload = { id: data[0].id, email: data[0].email };
              jwt.sign(
                payload,
                secretOrKey,
                { expiresIn: "1d" },
                (err, token) => {
                  res.status(200).json(token);
                }
              );
            } else {
              res.status(400).json("Bad request");
            }
          })
          .catch(err => {
            res.status(400).json("Bad request");
          });
      });
  }
});

router.post("/forgot", (req, res) => {
  const { errors, isValid } = validateEmail(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  let resetToken;
  crypto.randomBytes(48, (err, buf) => {
    if (err) throw err;
    resetToken = buf
      .toString("base64")
      .replace(/\//g, "")
      .replace(/\+/g, "-");
  });

  database
    .select("id", "email")
    .from("users")
    .where({ email: req.body.email })
    .then(emailData => {
      if (emailData.length === 0) {
        res.status(400).json("Invalid email address");
      } else {
        database
          .returning(["email"])
          .from("users")
          .where({ email: emailData[0].email })
          .update({
            reset_password_token: resetToken,
            reset_password_expires: Date.now(),
            reset_password_token_used: "f"
          })
          .then(emailData => {
            const to = emailData[0].email;
            const subject = "Reset your ReliefJobs password";
            const verificationLink = `http://${
              process.env.NODE_ENV === "production"
                ? process.env.PROD_HOST
                : process.env.DEV_HOST
            }:${
              process.env.NODE_ENV === "production"
                ? process.env.PROD_PORT
                : process.env.DEV_PORT
            }/v1/users/verify/${resetToken}`;
            const content =
              "<body><p>Please click the following link to reset your ReliefJobs password.</p> <a href=" +
              verificationLink +
              ">Reset password</a></body>";
            sendEmail(to, subject, content);
            res.status(200).json("Reset password link sent successfully");
          })
          .catch(err => {
            res.status(400).json("Bad request");
          });
      }
    })
    .catch(err => {
      res.status(400).json("Bad request");
    });
});

module.exports = router;
