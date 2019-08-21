const express = require("express");
const router = express.Router();
const database = require("../../scripts/knex");

// Validations
const validateJob = require("../../validation/validateJob");
const validateJobUpdate = require("../../validation/validateJobUpdate");

// Get a list of all jobs
router.get("/all", (req, res) => {
  const errors = {};
  database
    .select("*")
    .from("jobs")
    .then(job => {
      if (job.length) {
        res.json(job);
      } else {
        errors.emptyDatabase = "No jobs in the database at the moment";
        res.json(errors);
      }
    })
    .catch(err => {
      errors.db = "Invalid request";
      res.status(400).json(errors);
    });
});

// Get a specific job
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
      errors.noMatch = "Not found. No job matches that id";
      res.status(400).json(errors);
    });
});

// Delete a specific job
router.delete("/:id", (req, res) => {
  const errors = {};
  const deleteId = req.params.id;
  database("jobs")
    .del()
    .where({ id: deleteId })
    .then(job => {
      if (job) {
        res.status(200).json(`Job with id ${deleteId} deleted successfully`);
      } else {
        errors.noMatch = "Impossible to delete. No job matches that id";
        res.status(400).json(errors);
      }
    })
    .catch(err => {
      errors.db = "Invalid request";
      res.status(400).json(errors);
    });
});

// Update a specific job
router.put("/:id", (req, res) => {
  const { errors, isValid } = validateJobUpdate(req.body);
  if (!isValid) return res.status(400).json(errors);

  const { duplicate, closing_date, expired } = req.body;
  const updateId = req.params.id;

  database("jobs")
    .update({
      duplicate,
      closing_date,
      expired,
      updated_at: "now"
    })
    .where({ id: updateId })
    .then(
      database
        .select("*")
        .from("jobs")
        .where({ id: updateId })
        .then(job => {
          res.status(200).json(job);
        })
        .catch(err => {
          errors.db = "Invalid request";
          res.status(400).json(errors);
        })
    )
    .catch(err => {
      errors.db = "Invalid request";
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
