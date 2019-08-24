const axios = require("axios");
const database = require("../../scripts/knex");
const {
  jobTypes,
  careerTypes,
  experienceTypes,
  organizationTypes
} = require("./reliefWebTypes");
const getRegionType = require("../regionTypes");

/* RELIEF WEB JOBS API DOCUMENTATION
 * Parameters: https://apidoc.rwlabs.org/parameters
 * Field Tables: https://apidoc.rwlabs.org/field-tables
 */

const reliefWebScrapper = async () => {
  let listOfIdsToGet = [];
  let insideIds = [];
  let outsideIds = [];

  const getExperienceType = type => {
    const result = experienceTypes.filter(xp => xp.id === type);
    return result[0] ? result[0].reliefJobsName : "not_specified";
  };

  const getCareerType = type => {
    const result = careerTypes.filter(career => career.id === type);
    return result[0] ? result[0].reliefJobsName : "other";
  };

  const getJobType = type => {
    const result = jobTypes.filter(job => job.id === type);
    return result[0] ? result[0].reliefJobsName : "other";
  };

  const getOrganizationType = type => {
    const result = organizationTypes.filter(org => org.id === type);
    return result[0] ? result[0].reliefJobsName : "other";
  };

  const getJobIds = {
    profile: "minimal",
    slim: 1,
    preset: "latest",
    limit: 25,
    // offset: 250,
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

    .then(async insideIdList => {
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
        .then(async () => {
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
          const results = listOfIdsToGet.map(async id => {
            return axios
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
                  file,
                  date: { closing, created }
                } = res.data.data[0].fields;
                const body_html = res.data.data[0].fields["body-html"];
                const how_to_apply_html =
                  res.data.data[0].fields["how_to_apply-html"];
                // Step 5, insert data in the database]
                return database("jobs")
                  .insert({
                    title: title ? title : null,
                    body: body ? body : null,
                    body_html: body_html ? body_html : null,
                    how_to_apply_html: how_to_apply_html
                      ? how_to_apply_html
                      : null,
                    status: status ? status : null,
                    how_to_apply: how_to_apply ? how_to_apply : null,
                    org_name: source ? source[0].name : null,
                    org_shortname: source ? source[0].shortname : null,
                    org_homepage: source ? source[0].homepage : null,
                    org_code: source ? source[0].id : null,
                    org_type: source
                      ? getOrganizationType(source[0].type.id)
                      : null,
                    org_type_id: source ? source[0].type.id : null,
                    job_type: type ? getJobType(type[0].id) : "other",
                    job_type_id: type ? type[0].id : null,
                    theme_type: theme
                      ? theme
                      : { id: 9999, name: "not_specified" },
                    career_type: career_categories
                      ? getCareerType(career_categories[0].id)
                      : "other",
                    career_type_id: career_categories
                      ? career_categories[0].id
                      : null,
                    experience_type: experience
                      ? getExperienceType(experience[0].id)
                      : "not_specified",
                    experience_type_id: experience ? experience[0].id : null,
                    country: country ? country[0] : null,
                    region_type: country
                      ? getRegionType(country[0].id)
                      : "not_specified",
                    city: city ? city[0].name : null,
                    source: url ? url : null,
                    file: file ? file : null,
                    original_posting_date: created ? created : null,
                    closing_date: closing ? closing : null,
                    origin_source: "reliefWeb",
                    origin_id: id.toString(10)
                  })
                  .then(res => {
                    return res.rowCount;
                  })
                  .catch(err => console.log(err));
              })
              .catch(error => {
                // handle error
                console.log(error);
              });
          });
          await Promise.all(results).then(res => {
            const jobsInserted = res.reduce((acc, curr) => {
              return acc + curr;
            }, 0);
            console.log(
              `✔️  ${jobsInserted} jobs inserted from the ReliefWeb database`
            );
          });
        })
        .catch(error => {
          // handle error
          console.log(error);
        });
    })
    .catch(error => {
      // handle error
      console.log(error);
    });
};

module.exports = reliefWebScrapper;
