const puppeteer = require("puppeteer");
const getRegionType = require("../regionTypes");
const database = require("../../scripts/knex");
const {
  getDate,
  getCountry,
  getExperienceType,
  getJobType,
  getOrganization,
  getOrganizationType,
  getCareerType,
  getThemeType
} = require("./coordinationSudScrapperHelpers");
const orgResources = require("../../resources/organizations/reliefWebOrganizationsData.json");

const coordinationSudSpecificJobUrl =
  "https://www.coordinationsud.org/offre-emploi/";
const coordinationSudListOfJobsUrl =
  "https://www.coordinationsud.org/espace-emploi/?mots";

// Used to delay page evalution events randomly
const randomDelay = () => {
  return Math.floor(Math.random() * 500);
};

////////////////////////////////////////////////////////////////////////
//// COORDINATION SUD - SCRAPPER FUNCTION FOR ONE SPECIFIC JOB PAGE ////
////////////////////////////////////////////////////////////////////////

let oneJobPageScrapper = async (url, postId) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.waitFor(randomDelay());
  await page.goto(`${coordinationSudSpecificJobUrl}${url}`, {
    waitUntil: "domcontentloaded",
    timeout: 0
  });

  const getData = async dataTarget => {
    await page.waitFor(randomDelay());
    return (result = await page.evaluate(dataTarget => {
      let element = document
        .querySelector(dataTarget)
        .innerText.replace(/\s+/g, " ")
        .trim();
      return element;
    }, dataTarget));
  };

  const getClasses = async classes => {
    await page.waitFor(randomDelay());
    return (result = await page.evaluate(classes => {
      let element = [...document.querySelector(classes).classList];
      return element;
    }, classes));
  };

  const getSections = async postId => {
    await page.waitFor(randomDelay());
    return (result = await page.evaluate(postId => {
      let data = [];
      let elements = document.querySelectorAll(
        `#${postId} > div > table > tbody > tr`
      );
      for (let i = 1; i < elements.length + 1; i++) {
        let sectionTitle = document
          .querySelector(`:nth-child(${i}) > th`)
          .innerText.replace(/\s+/g, " ")
          .trim();
        data.push({
          section: sectionTitle,
          selector: `#${postId} > div > table > tbody > tr:nth-child(${i}) > td`
        });
      }

      return data;
    }, postId));
  };

  const getId = id => {
    return id.split("-") ? id.split("-")[1] : null;
  };

  const getLinks = async () => {
    await page.waitFor(randomDelay());
    const result = await page.evaluate(() => {
      let data = [];
      let elements = document.querySelectorAll(
        `#content > aside.block > ul > li`
      );
      for (let i = 0; i < elements.length; i++) {
        let link = elements[i].querySelector(`a`).getAttribute("href");
        let text = elements[i]
          .querySelector(`a`)
          .innerText.replace(/\s+/g, " ")
          .trim();
        data.push({
          url: link,
          name: text
        });
      }
      return data;
    });
    return result;
  };

  const sections = await getSections(postId).then(async res => {
    const result = [];
    for (let el of res) {
      await page.waitFor(randomDelay());
      const section = await page.evaluate(el => {
        const title = document.querySelector(`${el.selector}`)
          ? document
              .querySelector(`${el.selector}`)
              .innerText.replace(/\s+/g, " ")
              .trim()
          : null;
        return title;
      }, el);
      result.push({ section: el.section, data: section, html: false });
    }
    for (let el of res) {
      await page.waitFor(randomDelay());
      const section = await page.evaluate(el => {
        const title = document.querySelector(`${el.selector}`)
          ? document.querySelector(`${el.selector}`).innerHTML
          : null;
        return title;
      }, el);
      if (
        el.section === "Description" ||
        el.section === "Comment postuler" ||
        el.section === "Expériences / Formation du candidat" ||
        el.section === "Experience / Qualifications" ||
        el.section === "Salaire / Indemnité"
      )
        result.push({ section: el.section, data: section, html: true });
    }

    return result;
  });

  const title = await getData(".entry-title");
  const org_name = await getData(".author");
  const classNames = await getClasses(`#${postId}`);
  const links = await getLinks();

  sections.push(
    { section: "title", data: title, html: false },
    { section: "org_name", data: org_name, html: false },
    { section: "origin_id", data: getId(postId), html: false },
    { section: "classNames", data: classNames, html: false },
    { section: "links", data: links, html: false }
  );

  browser.close();
  return sections;
};

/////////////////////////////////////////////////////////////////////////////
//// THIS SECTION CALLS THE SCRAPPER AND INJECTS DATA INTO THE DATABASE ////
///////////////////////////////////////////////////////////////////////////

const launchOnePageScrapper = (url, postId) => {
  return oneJobPageScrapper(url, postId).then(jobData => {
    // console.log(jobData);
    const country =
      jobData.filter(
        data => data.section === "Pays" || data.section === "Country"
      ).length !== 0
        ? getCountry(
            jobData.filter(
              data => data.section === "Pays" || data.section === "Country"
            )[0].data
          )
        : null;
    const experience =
      jobData.filter(data => data.section === "Experience").length !== 0
        ? getExperienceType(
            jobData.filter(data => data.section === "Experience")[0].data
          )
        : null;
    const organization =
      jobData.filter(data => data.section === "org_name").length !== 0
        ? getOrganization(
            jobData.filter(data => data.section === "org_name")[0].data
          )
        : null;
    const getLogo = orgId => {
      const targetOrg = orgResources.filter(org => org.id == orgId);
      if (targetOrg.length !== 0) {
        return targetOrg[0].fields.logo ? targetOrg[0].fields.logo : null;
      } else return null;
    };
    return database("jobs")
      .insert({
        title:
          jobData.filter(data => data.section === "title").length !== 0
            ? jobData.filter(data => data.section === "title")[0].data
            : null,
        body:
          jobData.filter(data => data.section === "Description").length !== 0
            ? jobData.filter(data => data.section === "Description")[0].data
            : null,
        body_html:
          jobData.filter(data => data.section === "Description" && data.html)
            .length !== 0
            ? jobData
                .filter(data => data.section === "Description" && data.html)[0]
                .data.trim()
            : null,
        how_to_apply:
          jobData.filter(data => data.section === "Comment postuler").length !==
          0
            ? jobData.filter(data => data.section === "Comment postuler")[0]
                .data
            : null,
        how_to_apply_html:
          jobData.filter(
            data => data.section === "Comment postuler" && data.html
          ).length !== 0
            ? jobData.filter(
                data => data.section === "Comment postuler" && data.html
              )[0].data
            : null,
        qualifications:
          jobData.filter(
            data =>
              data.section === "Experience / Qualifications" ||
              data.section === "Expériences / Formation du candidat"
          ).length !== 0
            ? jobData.filter(
                data =>
                  data.section === "Experience / Qualifications" ||
                  data.section === "Expériences / Formation du candidat"
              )[0].data
            : null,
        qualifications_html:
          jobData.filter(
            data =>
              (data.section === "Experience / Qualifications" && data.html) ||
              (data.section === "Expériences / Formation du candidat" &&
                data.html)
          ).length !== 0
            ? jobData.filter(
                data =>
                  (data.section === "Experience / Qualifications" &&
                    data.html) ||
                  (data.section === "Expériences / Formation du candidat" &&
                    data.html)
              )[0].data
            : null,
        status: "published",
        org_name: organization
          ? organization.fields.name
          : jobData.filter(data => data.section === "org_name").length !== 0
          ? jobData.filter(data => data.section === "org_name")[0].data
          : null,
        org_shortname: organization
          ? organization.fields.shortname
          : jobData.filter(data => data.section === "org_name").length !== 0
          ? jobData.filter(data => data.section === "org_name")[0].data
          : null,
        org_homepage: organization ? organization.fields.homepage : null,
        org_code: organization ? organization.fields.id : null,
        org_type: organization
          ? getOrganizationType(organization.fields.type.id)
          : null,
        org_type_id: organization ? organization.fields.type.id : null,
        job_type:
          jobData.filter(data => data.section === "classNames").length !== 0
            ? getJobType(
                jobData.filter(data => data.section === "classNames")[0].data,
                "type"
              )
            : "other",
        job_type_id:
          jobData.filter(data => data.section === "classNames").length !== 0
            ? getJobType(
                jobData.filter(data => data.section === "classNames")[0].data,
                "id"
              )
            : null,
        theme_type:
          jobData.filter(
            data =>
              data.section === "Secteurs d’activité" ||
              data.section === "Areas of activity"
          ).length !== 0
            ? getThemeType(
                jobData.filter(
                  data =>
                    data.section === "Secteurs d’activité" ||
                    data.section === "Areas of activity"
                )[0]
              )
            : null,
        career_type:
          jobData.filter(
            data => data.section === "Fonctions" || data.section === "Positions"
          ).length !== 0
            ? getCareerType(
                jobData.filter(
                  data =>
                    data.section === "Fonctions" || data.section === "Positions"
                )[0]
              )
            : null,
        salary:
          jobData.filter(data => data.section === "Salaire / Indemnité")
            .length !== 0
            ? jobData
                .filter(data => data.section === "Salaire / Indemnité")[0]
                .data.trim()
            : null,
        salary_html:
          jobData.filter(
            data => data.section === "Salaire / Indemnité" && data.html
          ).length !== 0
            ? jobData.filter(
                data => data.section === "Salaire / Indemnité" && data.html
              )[0].data
            : null,
        experience_type: experience
          ? experience.reliefJobsName
          : "not_specified",
        experience_type_id: experience ? experience.id : null,
        city:
          jobData.filter(
            data => data.section === "Ville" || data.section === "Town/City"
          ).length !== 0
            ? jobData.filter(
                data => data.section === "Ville" || data.section === "Town/City"
              )[0].data
            : null,
        country: country ? country : null,
        region_type: country ? getRegionType(country.id) : "not_specified",
        source: `${coordinationSudSpecificJobUrl}${url}`,
        files:
          jobData.filter(data => data.section === "links")[0].data.length !== 0
            ? {
                links:
                  jobData.filter(data => data.section === "links").length !== 0
                    ? jobData.filter(data => data.section === "links")[0].data
                    : null
              }
            : null,
        links:
          jobData.filter(
            data =>
              data.section === "Postuler en ligne" ||
              data.section === "On-line application link"
          ).length !== 0
            ? {
                applyOnline:
                  jobData.filter(
                    data =>
                      data.section === "Postuler en ligne" ||
                      data.section === "On-line application link"
                  ).length !== 0
                    ? jobData.filter(
                        data =>
                          data.section === "Postuler en ligne" ||
                          data.section === "On-line application link"
                      )[0].data
                    : null
              }
            : null,
        org_logo: organization ? getLogo(organization.fields.id) : null,
        original_posting_date: new Date(Date.now()),
        closing_date:
          jobData.filter(
            data =>
              data.section === "Date de fin de validité" ||
              data.section === "Advertisement expiration date"
          ).length !== 0
            ? getDate(
                jobData.filter(
                  data =>
                    data.section === "Date de fin de validité" ||
                    data.section === "Advertisement expiration date"
                )[0].data
              )
            : null,
        origin_source: "coordinationSud",
        origin_id:
          jobData.filter(data => data.section === "origin_id").length !== 0
            ? jobData.filter(data => data.section === "origin_id")[0].data
            : null
      })
      .then(res => {
        return res.rowCount;
      })
      .catch(err => console.log(err));
  });
};

/////////////////////////////////////////////////////////////////////////////////////
//// THIS SECTION GETS THE URLS AND IDS OF JOBS LISTED ON THE COORDINATION SUD  ////
///  HOMEPAGE. IT THEN LOOPS OVER THEM USING THE SCRAPPER FUNCTIONS ABOVE      ////
//////////////////////////////////////////////////////////////////////////////////

const coordinationSudScrapper = async () => {
  database
    .select("origin_id")
    .where({ origin_source: "coordinationSud" })
    .from("jobs")
    .then(async insideIdList => {
      const jobsList = [];
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto(coordinationSudListOfJobsUrl, {
        waitUntil: "domcontentloaded",
        timeout: 0
      });

      const getJobs = async () => {
        const result = await page.evaluate(() => {
          let data = [];
          let elements = document.querySelectorAll(
            `.p_annonces` // or type-p_annonces
          );
          for (let i = 0; i < elements.length; i++) {
            let classes = [...elements[i].classList];
            let link = elements[i].querySelector(`a`).getAttribute("href");
            data.push({
              classes: classes,
              link: link
            });
          }
          return data;
        });
        return result;
      };

      const jobs = await getJobs();

      const postIds = jobs.map(job => {
        return job.classes.filter(className => {
          return /post-\d+/.test(className);
        });
      });
      const jobUrls = jobs.map(job => {
        return job.link
          .split("/")
          .reverse()
          .find(url => url);
      });

      for (let i = 0; i < postIds.length; i++) {
        jobsList.push({
          id: postIds[i][0],
          url: jobUrls[i]
        });
      }

      browser.close();

      const removeDuplicateIds = (insideIds, outsideIds) => {
        let inside = insideIds.map(job => `post-${job.origin_id}`);
        let outside = outsideIds.map(job => job.id);
        return outside.filter(id => {
          return !inside.includes(id);
        });
      };

      const listOfIdsToGet =
        insideIdList.length !== 0
          ? removeDuplicateIds(insideIdList, jobsList)
          : jobsList.map(job => job.id);

      const filteredJobsList = jobsList.filter(job => {
        return listOfIdsToGet.includes(job.id);
      });

      if (filteredJobsList.length !== 0) {
        const results = filteredJobsList.map(async job => {
          return launchOnePageScrapper(job.url, job.id);
        });

        await Promise.all(results).then(res => {
          const jobsInserted = res.reduce((acc, curr) => {
            return acc + curr;
          }, 0);
          console.log(
            `✔️  ${jobsInserted} jobs inserted from the Coordination Sud database`
          );
        });
      } else {
        console.log(
          `✔️  Up to date - No jobs to add from the Coordination Sud database`
        );
      }
    });
};

module.exports = coordinationSudScrapper;
