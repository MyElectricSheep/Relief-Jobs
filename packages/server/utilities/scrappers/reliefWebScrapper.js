const axios = require("axios");
const database = require("../../scripts/knex");
const {
  jobTypes,
  careerTypes,
  experienceTypes,
  organizationTypes,
  themeTypes
} = require("./reliefWebTypes");

/* RELIEF WEB JOBS API DOCUMENTATION
 * Parameters: https://apidoc.rwlabs.org/parameters
 * Field Tables: https://apidoc.rwlabs.org/field-tables
 */

const reliefWebScrapper = () => {
  let listOfIdsToGet = [];
  let insideIds = [];
  let outsideIds = [];

  const getExperienceType = type => {
    const result = experienceTypes.filter(xp => xp.id === type);
    return result[0] ? result[0].reliefJobsName : "not_specified";
  };

  // const getCareerType = type => {

  //   else return "other";
  // }

  const getJobIds = {
    profile: "minimal",
    slim: 1,
    preset: "latest",
    limit: 1,
    fields: {
      exclude: ["title", "id"]
    }
  };

  const getFullJob = id => {
    return {
      profile: "full",
      query: {
        value: id,
        fields: ["id"]
      }
    };
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
          // Step 3, compare databases and remove duplicate IDs
          const removeDuplicateIds = (insideIds, outsideIds) => {
            let inside = insideIds.map(job => job.origin_id);
            let outside = outsideIds.map(job => job.id);
            return outside.filter(id => {
              return !inside.includes(id);
            });
          };
          listOfIdsToGet = removeDuplicateIds(insideIds, outsideIds);
          // Step 4, get the full data for all jobs that are not already in the database
          listOfIdsToGet.map(id => {
            axios
              .post(
                `https://api.reliefweb.int/v1/jobs?appname=${
                  process.env.RELIEFWEB_APP_NAME
                }`,
                getFullJob(id)
              )
              .then(res => {
                const {
                  id,
                  title,
                  status,
                  body,
                  how_to_apply,
                  city,
                  country,
                  source,
                  theme,
                  type,
                  experience,
                  career_categories,
                  url,
                  date: { closing }
                } = res.data.data[0].fields;
                // Step 5, insert data in the database
                // console.log(res.data.data[0].fields.country[0].iso3);
                getExperienceType(experience[0].id);
                database("jobs")
                  .insert({
                    title: title ? title : null,
                    body: body ? body : null,
                    // body_html: ,
                    status: status ? status : null,
                    how_to_apply: how_to_apply ? how_to_apply : null,
                    // how_to_apply_html: ,
                    // org_name:,
                    // org_shortname:,
                    // org_homepage:,
                    // org_code:,
                    // org_type:,
                    // org_type_id:,
                    // job_type:,
                    // job_type_id:,
                    // theme_type:,
                    // theme_type_id:,
                    // career_type: career_categories
                    //   ? getCareerType(career_categories[0].name)
                    //   : "other",
                    // career_type_id: career_categories
                    //   ? career_categories[0].id
                    //   : null,
                    experience_type: experience
                      ? getExperienceType(experience[0].id)
                      : "not_specified",
                    experience_type_id: experience ? experience[0].id : null,
                    // location_type:,
                    // country: country ? country[0].iso3 : null,
                    // region_type:,
                    // city: city ? city[0].name : null,
                    // source,
                    // links:,
                    closing_date: closing ? closing : null,
                    origin_source: "reliefWeb",
                    // origin_id: id.toString(10)
                    origin_id: "1234567"
                  })
                  .then(res => console.log(res))
                  .catch(err => console.log(err));
              });
          });
        })
        .catch(error => {
          // handle error
          console.log(error);
        })
        .finally(() => {
          // always executed
        });
    });
};

module.exports = reliefWebScrapper;
