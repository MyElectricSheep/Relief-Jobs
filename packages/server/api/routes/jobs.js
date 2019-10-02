const express = require("express");
const router = express.Router();
const database = require("../../scripts/knex");

// Validations
const validateJob = require("../../validation/validateJob");
const validateJobUpdate = require("../../validation/validateJobUpdate");

// Get a list of all jobs with all info
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

// Get a list of latest jobs with only card details info (mandatory offset / optional filter)
router.get("/latest/:offset", async (req, res) => {
  const errors = {};
  const offset = req.params.offset ? req.params.offset * 30 : 0;
  // if offset is set to 0 => latest 30 jobs will be returned
  // if offset is set to x => latest jobs offset by x * 30 will be returned
  const filters = { xpFilters: req.query.xp };
  // filters work by getting the property for each query string parameter in the URL
  // and setting it as an array (eg: ?xp[]=0-2&xp[]=3-4&xp[]=5-9 will give ['0-2', '3-4', '5-9'])
  // https://expressjs.com/en/4x/api.html#req.query

  const model = database("jobs").where(qb => {
    if (filters.xpFilters && filters.xpFilters.length !== 0) {
      filters.xpFilters.map(filter => {
        return qb.orWhere("experience_type", "=", filter);
      });
    }
  });
  const filteredCount = await model.clone().count();

  database("jobs")
    .count("id as CNT")
    .then(total =>
      database
        .select(
          "id",
          "title",
          "body",
          "org_name",
          "org_shortname",
          "org_code",
          "org_logo",
          "job_type",
          "country",
          "city",
          "career_type",
          "experience_type",
          "theme_type",
          "original_posting_date",
          "closing_date",
          "origin_source",
          "source"
        )
        .from("jobs")
        .where(qb => {
          if (filters.xpFilters && filters.xpFilters.length !== 0) {
            filters.xpFilters.map(filter => {
              return qb.orWhere("experience_type", "=", filter);
            });
          }
        })
        .orderBy("created_at", "desc")
        .offset(offset)
        .limit(30)
        .then(jobs => {
          if (jobs.length) {
            const result = [];
            for (let job of jobs) {
              const bodyLength = job.body ? job.body.length : 0;
              job.body = bodyLength
                ? job.body.split(" ").length < 220
                  ? job.body
                  : job.body
                      .split(" ")
                      .splice(0, 220)
                      .join(" ") // limits the job description excerpt to 220 words
                : job.body;
              result.push(job);
            }
            const send = {
              jobs: result,
              totalCount: total[0].CNT,
              filteredCount: filteredCount[0]["count"],
              paginationIndex: req.params.offset ? req.params.offset : 0
            };
            res.json(send);
          } else {
            errors.emptyDatabase = "No jobs in the database at the moment";
            res.json(errors);
          }
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

// Get all information for a specific job
router.get("/id/:id", (req, res) => {
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
router.delete("/id/:id", (req, res) => {
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
router.put("/id/:id", (req, res) => {
  const { errors, isValid } = validateJobUpdate(req.body);
  if (!isValid) return res.status(400).json(errors);

  const { duplicate, closing_date, expired } = req.body;
  const updateId = req.params.id;

  return database("jobs")
    .update({
      duplicate,
      closing_date,
      expired,
      updated_at: "now"
    })
    .where({ id: updateId })
    .then(() => {
      return database
        .select("*")
        .from("jobs")
        .where({ id: updateId })
        .then(updatedJob => {
          res
            .status(200)
            .json({ message: "Job updated successfully", updatedJob });
        })
        .catch(err => {
          errors.db = "Invalid request";
          res.status(400).json(errors);
        });
    })
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

module.exports = router;
