const Validator = require("validator");
const ifEmpty = require("./checkEmpty");

const validateJob = data => {
  let errors = {};

  data.duplicate = !ifEmpty(data.duplicate) ? data.duplicate : "";
  data.closing_date = !ifEmpty(data.closing_date) ? data.closing_date : "";
  data.expired = !ifEmpty(data.expired) ? data.expired : "";

  if (Validator.isEmpty(data.duplicate)) {
    errors.duplicate_status = "A duplicate status is required";
  }

  if (!Validator.isBoolean(data.duplicate)) {
    errors.duplicate_status = "Duplicate status needs to be a boolean";
  }

  if (Validator.isEmpty(data.closing_date)) {
    errors.closing_date = "A closing date is required";
  }

  if (!Validator.isISO8601(data.closing_date)) {
    errors.closing_date = "A valid ISO 8601 compliant date is required";
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString
  }

  if (Validator.isEmpty(data.expired)) {
    errors.expiration_status = "An expiration status is required";
  }

  if (!Validator.isBoolean(data.expired)) {
    errors.expiration_status = "Expiration status needs to be a boolean";
  }

  return {
    errors,
    isValid: ifEmpty(errors)
  };
};

module.exports = validateJob;
