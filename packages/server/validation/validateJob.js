const Validator = require("validator");
const ifEmpty = require("./checkEmpty");

const validateJob = data => {
  let errors = {};

  data.job_title = !ifEmpty(data.job_title) ? data.job_title : "";
  data.job_description = !ifEmpty(data.job_description)
    ? data.job_description
    : "";
  data.how_to_apply = !ifEmpty(data.how_to_apply) ? data.how_to_apply : "";
  data.organization_name = !ifEmpty(data.organization_name)
    ? data.organization_name
    : "";
  data.country = !ifEmpty(data.country) ? data.country : "";

  if (Validator.isEmpty(data.job_description)) {
    errors.job_description = "A job description is required";
  }
  if (Validator.isEmpty(data.job_title)) {
    errors.job_title = "A job title is required";
  }
  if (Validator.isEmpty(data.how_to_apply)) {
    errors.how_to_apply = "How to apply instructions are required";
  }
  if (Validator.isEmpty(data.organization_name)) {
    errors.organization_name = "An organization name for this job is required";
  }
  if (Validator.isEmpty(data.country)) {
    errors.country = "A country code is required";
  }

  return {
    errors,
    isValid: ifEmpty(errors)
  };
};

module.exports = validateJob;
