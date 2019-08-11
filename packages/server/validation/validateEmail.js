const ifEmpty = require("./checkEmpty");
const validator = require("validator");

const validateEmail = data => {
  let errors = {};

  data.email = !ifEmpty(data.email) ? data.email : "";

  if (validator.isEmpty(data.email)) {
    errors.email = "Email is required";
  }

  if (!validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  return {
    errors,
    isValid: ifEmpty(errors)
  };
};

module.exports = validateEmail;
