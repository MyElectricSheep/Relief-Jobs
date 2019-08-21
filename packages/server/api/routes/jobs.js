const express = require("express");
const router = express.Router();
const database = require("../../scripts/knex");

// Validations
const validateJob = require("../../validation/validateJob");

// Get a list of all jobs in the database
router.get("/all", (req, res) => {
  const errors = {};
  database
    .select("*")
    .from("jobs")
    .then(job => {
      if (job.length) {
        res.json(job);
      } else {
        errors.db = "No jobs matching that request";
        res.json(errors);
      }
    })
    .catch(err => {
      errors.db = "Invalid request";
      res.status(400).json(errors);
    });
});

// Get a specific job from the database
router.get("/:id", (req, res) => {
  const errors = {};
  const searchId = req.params.id;
  database
    .select("*")
    .from("jobs")
    .where({ id: searchId })
    .then(job => {
      res.status(200).json(job);
    })
    .catch(err => {
      errors.noMatch = "No job matches that id";
      res.status(400).json(errors);
    });
});

// Add a job in the database
router.post("/add", (req, res) => {
  const { errors, isValid } = validateJob(req.body);
  if (!isValid) return res.status(400).json(errors);

  const {
    job_title,
    job_description,
    how_to_apply,
    organization_name,
    organization_code,
    organization_type,
    job_type,
    theme_type,
    career_type,
    experience_type,
    location_type,
    country,
    region_type,
    city,
    links,
    duplicate,
    closing_date,
    number_of_views,
    expired
  } = req.body;

  database("jobs")
    .returning("id", "job_title", "country")
    .insert({
      job_title,
      job_description,
      how_to_apply,
      organization_name,
      country
    })
    .then(job => {
      res.status(200).json(job);
    })
    .catch(err => {
      errors.db = "Invalid request";
      res.status(400).json(errors);
    });
});
errors: module.exports = router;
