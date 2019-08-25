const puppeteer = require("puppeteer");
const reliefWebCountries = require("../../resources/countries/reliefWebCountriesData.json");
const reliefWebOrganizations = require("../../resources/organizations/reliefWebOrganizationsData.json");
const frCountries = require("../../resources/countries/countriesFr.json");
const getRegionType = require("../regionTypes");
const database = require("../../scripts/knex");
const { experienceTypes, organizationTypes } = require("./reliefWebTypes");

const coordinationSudUrl = "https://www.coordinationsud.org/offre-emploi/";

////////////////////////////////////////////////////////////////////////
//// COORDINATION SUD - SCRAPPER FUNCTION FOR ONE SPECIFIC JOB PAGE ////
////////////////////////////////////////////////////////////////////////

let scrapper = async (url, postId) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(`${coordinationSudUrl}${url}`);

  const getData = async dataClass => {
    return (result = await page.evaluate(dataClass => {
      let element = document.querySelector(dataClass).innerText;
      return element;
    }, dataClass));
  };

  const getSections = async postId => {
    return (result = await page.evaluate(postId => {
      let data = [];
      let elements = document.querySelectorAll(
        `#${postId} > div > table > tbody > tr`
      );
      for (let i = 1; i < elements.length + 1; i++) {
        let sectionTitle = document.querySelector(`:nth-child(${i}) > th`)
          .innerText;
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

  const sections = await getSections(postId).then(async res => {
    const result = [];
    for (let el of res) {
      const section = await page.evaluate(el => {
        const title = document.querySelector(`${el.selector}`)
          ? document.querySelector(`${el.selector}`).innerText
          : null;
        return title;
      }, el);
      result.push({ section: el.section, data: section, html: false });
    }
    for (let el of res) {
      const section = await page.evaluate(el => {
        const title = document.querySelector(`${el.selector}`)
          ? document.querySelector(`${el.selector}`).innerHTML
          : null;
        return title;
      }, el);
      if (
        el.section === "Description" ||
        el.section === "Comment postuler" ||
        el.section === "Expériences / Formation du candidat"
      )
        result.push({ section: el.section, data: section, html: true });
    }

    return result;
  });

  const title = await getData(".entry-title");
  const org_name = await getData(".author");

  sections.push(
    { section: "title", data: title, html: false },
    { section: "org_name", data: org_name, html: false },
    { section: "origin_id", data: getId(postId), html: false }
  );

  browser.close();

  return sections;
};

/////////////////////////////////////////////////////////////////////////////////
//// HELPER FUNCTIONS TO CONVERT SCRAPPED DATA TO THE RIGHT DATABASE FORMAT ////
///////////////////////////////////////////////////////////////////////////////

const getDate = dateString => {
  const dateParts = dateString.split("/");
  const year = new Date(Date.now()).getFullYear();
  if (dateParts.length < 3) dateParts.push(year);
  dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
  return dateObject ? dateObject : null;
};

const getCountry = countryData => {
  const scrappedCountry = countryData.split(",").map(el => el.trim());
  const targetFrCountry = frCountries.filter(
    country => country.name === scrappedCountry[1]
  );
  const targetReliefWebCountry =
    targetFrCountry.length !== 0
      ? reliefWebCountries.filter(
          country => country.fields.iso3 === targetFrCountry[0].alpha3
        )
      : null;

  return targetReliefWebCountry ? targetReliefWebCountry[0].fields : null;
};

const getExperienceType = type => {
  const convertXp = xp => {
    if (xp === "0 à 3 ans") return "0-2 years";
    if (xp === "3 à 5 ans") return "3-4 years";
    if (xp === "5 à 10 ans") return "5-9 years";
    if (xp === "> 10 ans") return "10+ years";
    else return null;
  };

  const result = experienceTypes.filter(xp => xp.name === convertXp(type));
  return result.length !== 0 ? result[0] : "not_specified";
};

const getOrganization = org => {
  const targetOrg = reliefWebOrganizations.filter(
    organization =>
      organization.fields.name.trim().toLowerCase() === org.trim().toLowerCase()
  );
  return targetOrg.length !== 0 ? targetOrg[0] : null;
};

const getOrganizationType = type => {
  const result = organizationTypes.filter(org => org.id === type);
  return result.length !== 0 ? result[0].reliefJobsName : "other";
};

/////////////////////////////////////////////////////////////////////////////
//// NEXT SECTION CALLS THE SCRAPPER AND INJECTS DATA INTO THE DATABASE ////
///////////////////////////////////////////////////////////////////////////

const coordinationSudScrapper = (url, postId) => {
  scrapper(url, postId).then(jobData => {
    // console.log(jobData);
    const country =
      jobData.filter(data => data.section === "Pays").length !== 0
        ? getCountry(jobData.filter(data => data.section === "Pays")[0].data)
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
          ? getOrganizationType(organization.fields.id)
          : null,
        org_type_id: organization ? organization.fields.type.id : null,
        // job_type: ,
        // job_type_id: ,
        // theme_type: ,
        // career_type_id: ,

        salary:
          jobData.filter(data => data.section === "Salaire / Indemnité")
            .length !== 0
            ? jobData
                .filter(data => data.section === "Salaire / Indemnité")[0]
                .data.trim()
            : null,
        experience_type: experience
          ? experience.reliefJobsName
          : "not_specified",
        experience_type_id: experience ? experience.id : null,
        city:
          jobData.filter(data => data.section === "Ville").length !== 0
            ? jobData.filter(data => data.section === "Ville")[0].data
            : null,
        country: country ? country : null,
        region_type: country ? getRegionType(country.id) : "not_specified",
        source: `${coordinationSudUrl}${url}`,
        // file: ,
        links: {
          applyOnline:
            jobData.filter(data => data.section === "Postuler en ligne")
              .length !== 0
              ? jobData.filter(data => data.section === "Postuler en ligne")[0]
                  .data
              : null
        },
        original_posting_date: new Date(Date.now()),
        closing_date:
          jobData.filter(data => data.section === "Date de fin de validité")
            .length !== 0
            ? getDate(
                jobData.filter(
                  data => data.section === "Date de fin de validité"
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
        // return
        console.log(res);
      })
      .catch(err => console.log(err));
  });
};

module.exports = coordinationSudScrapper;
