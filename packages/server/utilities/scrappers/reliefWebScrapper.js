const axios = require("axios");
const database = require("../../scripts/knex");

/* RELIEF WEB JOBS API DOCUMENTATION
 * Parameters: https://apidoc.rwlabs.org/parameters
 * Field Tables: https://apidoc.rwlabs.org/field-tables
 */

const reliefWebScrapper = () => {
  let finalListOfIdsToGet = [];
  let insideIds = [];
  let outsideIds = [];

  const getJobIds = {
    profile: "minimal",
    slim: 1,
    preset: "latest",
    limit: 10,
    fields: {
      exclude: ["title", "id"]
    }
  };

  const getFullJob = {
    profile: "full",
    query: {
      value: "3269053",
      fields: ["id"]
    }
  };

  // Step 1, build a list of reliefWeb job IDs already in the database
  database
    .select("origin_id")
    .where({ origin_source: "reliefWeb" })
    .from("jobs")

    .then(insideIdList => {
      insideIds = insideIdList;
      // Step 2, get the list of all job IDs in the ReliefWeb jobs database
      axios
        .post(
          `https://api.reliefweb.int/v1/jobs?appname=${
            process.env.RELIEFWEB_APP_NAME
          }`,
          getJobIds
        )
        .then(outsideIdList => {
          outsideIds = outsideIdList.data.data;
        })
        .then(() => {
          console.log(insideIds);
          console.log(outsideIds);
        })
        .catch(error => {
          // handle error
          console.log(error);
        })
        .finally(() => {
          // always executed
        });
    });

  // Step 3, compare databases and remove duplicate IDs

  // Step 4, get the full data for all jobs that are not already in our database

  // Step 5, insert data in our database
};

module.exports = reliefWebScrapper;
