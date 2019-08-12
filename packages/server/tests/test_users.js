process.env.NODE_ENV = "test";

const chai = require("chai");
const should = chai.should();
const chaiHttp = require("chai-http");
const server = require("../server");
const Chance = require("chance");
const chance = new Chance();

chai.use(chaiHttp);

describe("POST /v1/users/register", () => {
  it("should create a new valid user (with a token and a hashed password)", done => {
    const newUser = {
      email: chance.email(),
      username: chance.name(),
      phone_number: chance.phone(),
      password1: "12345678",
      password2: "12345678"
    };
    chai
      .request(server)
      .post("/v1/users/register")
      .send(newUser)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.data[0].should.have.property("token"); // a token has been attributed
        res.body.data[0].token.should.be.a("string");
        res.body.data[0].should.have.property("password");
        res.body.data[0].password.should.not.equal(newUser.password1); // it has been hashed
        res.body.data[0].should.have.property("email");
        res.body.data[0].email.should.be.a("string");
        res.body.message.should.be.a("string");
        res.body.message.should.equal("Verification email sent successfully");
        describe("POST /verify/:token", () => {
          it("should verify a user with the token sent by email", done => {
            chai
              .request(server)
              .post(`/v1/users/verify/${res.body.data[0].token}`)
              .send()
              .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.data[0].should.have.property("email_verified");
                res.body.data[0].email_verified.should.equal(true);
                res.body.data[0].should.have.property("token_used_before");
                res.body.data[0].token_used_before.should.equal(true);
                done();
              });
          });
          it("should not verify a user who is already verified", done => {
            chai
              .request(server)
              .post(`/v1/users/verify/${res.body.data[0].token}`)
              .send()
              .end((err, res) => {
                res.should.have.status(400);
                res.should.be.json;
                done();
              });
          });
          it("should not verify a user with an expired/wrong token", done => {
            chai
              .request(server)
              .post(`/v1/users/verify/12345678`)
              .send()
              .end((err, res) => {
                res.should.have.status(400);
                res.should.be.json;
                done();
              });
          });
        });

        done();
      });
  });
  it("should not accept a new user without both passwords being equal", done => {
    const newUser = {
      email: chance.email(),
      username: chance.name(),
      phone_number: chance.phone(),
      password1: "12345678",
      password2: "87654321"
    };
    chai
      .request(server)
      .post("/v1/users/register")
      .send(newUser)
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.json;
        done();
      });
  });
});
