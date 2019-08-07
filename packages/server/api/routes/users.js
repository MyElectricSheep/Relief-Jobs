const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const database = require("../../scripts/knex");
const validateUser = require("../../validation/validateUser");

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
    return token;
  });
  bcrypt.genSalt(saltRounds, (err, salt) => {
    if (err) throw err;
    bcrypt.hash(req.body.password1, salt, (err, hash) => {
      if (err) throw err;
      database("users")
        .returning(["id", "email", "registered"])
        .insert({
          email: req.body.email,
          password: hash,
          registered: Date.now(),
          token: token,
          createdtime: Date.now(),
          emailverified: "f",
          tokenusedbefore: "f"
        })
        .then(user => {
          res.json(user[0]);
        })
        .catch(err => {
          errors.account = "Email already registered";
          res.status(400).json(errors);
        });
    });
  });
});

module.exports = router;
