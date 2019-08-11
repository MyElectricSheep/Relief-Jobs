const ifEmpty = require("./checkEmpty");
const validator = require("validator");

const validateNewPassword = data => {
  let errors = {};

  data.password1 = !ifEmpty(data.password1) ? data.password1 : "";
  data.password2 = !ifEmpty(data.password2) ? data.password2 : "";

  if (validator.isEmpty(data.password1)) {
    errors.password1 = "Password 1 is required";
  }

  if (validator.isEmpty(data.password2)) {
    errors.password2 = "Password 2 is required";
  }

  if (!validator.equals(data.password1, data.password2)) {
    errors.noMatch = "Password 1 and Password 2 do not match";
  }

  if (!validator.isLength(data.password1, { min: 8, max: 120 })) {
    errors.length =
      "Password must be a minimum of 8 and a maximum of 120 characters";
  }

  return {
    errors,
    isValid: ifEmpty(errors)
  };
};

module.exports = validateNewPassword;
