const validator = require("validator");
const ifEmpty = require("./checkEmpty");

const validateLoginInput = data => {
  let errors = {};

  data.email = !ifEmpty(data.email) ? data.email : "";
  data.password = !ifEmpty(data.password) ? data.password : "";

  if (!validator.isEmail(data.email)) {
    errors.email = "Invalid email";
  }

  if (!validator.isEmpty(data.email)) {
    errors.email = "Email is required";
  }

  if (!validator.isEmpty(data.password)) {
    errors.password = "Password is required";
  }

  return {
    errors,
    isValid: ifEmpty(errors)
  };
};

module.exports = validateLoginInput;
