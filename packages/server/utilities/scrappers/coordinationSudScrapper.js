const puppeteer = require("puppeteer");
const reliefWebCountries = require("../../resources/countries/reliefWebCountriesData.json");
const database = require("../../scripts/knex");

let coordinationSudScrapper = async (url, postId) => {
  const coordinationSudUrl = "https://www.coordinationsud.org/offre-emploi/";
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
    { section: "org_name", data: org_name, html: false }
  );
  sections.push({ section: "origin_id", data: getId(postId), html: false });

  browser.close();
  return sections;
};

const getDate = dateString => {
  const dateParts = dateString.split("/");
  const year = new Date(Date.now()).getFullYear();
  if (dateParts.length < 3) dateParts.push(year);
  dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
  return dateObject ? dateObject : null;
};

const getCountry = countryData => {
  // {
  //     href: "https://api.reliefweb.int/v1/countries/216",
  //     id: 216,
  //     name: "Somalia",
  //     shortname: "Somalia",
  //     iso3: "som",
  //     location: { lat: 5.79, lon: 47.33 }
  //   }
  // Afrique, Madagascar
};

const scrapper = (url, postId) => {
  coordinationSudScrapper(url, postId).then(jobData => {
    console.log(reliefWebCountries.data[0]);
    console.log(jobData);
    // console.log(jobData.filter(data => data.section === "origin_id")[0].data);
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
            ? jobData.filter(
                data => data.section === "Description" && data.html
              )[0].data
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
        org_name:
          jobData.filter(data => data.section === "org_name").length !== 0
            ? jobData.filter(data => data.section === "org_name")[0].data
            : null,
        org_shortname:
          jobData.filter(data => data.section === "org_name").length !== 0
            ? jobData.filter(data => data.section === "org_name")[0].data
            : null,
        // org_homepage: ,
        // org_code: ,
        // org_type: ,
        // org_type_id: ,
        // job_type: ,
        // job_type_id: ,
        // theme_type: ,
        // career_type_id: ,
        // experience_type: ,
        // experience_type_id: ,
        country:
          jobData.filter(data => data.section === "Pays").length !== 0
            ? getCountry(
                jobData.filter(data => data.section === "Pays")[0].data
              )
            : null,
        // region_type: ,
        // city: ,
        // source: ,
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

module.exports = scrapper;
