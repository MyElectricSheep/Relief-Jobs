const puppeteer = require("puppeteer");
const database = require("../../scripts/knex");

let coordinationSudScrapper = async (url, postId) => {
  const coordinationSudUrl = "https://www.coordinationsud.org/offre-emploi/";
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(`${coordinationSudUrl}${url}`);

  const getTitle = async () => {
    return (result = await page.evaluate(() => {
      let element = document.querySelector(`.entry-title`).innerText;
      return element;
    }));
  };

  const getSections = async postId => {
    return (result = await page.evaluate(postId => {
      let data = [];
      let elements = document.querySelectorAll(
        `#${postId} > div > table > tbody > tr`
      );
      for (let i = 1; i < elements.length; i++) {
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

  const title = await getTitle();
  sections.push({ section: "title", data: title, html: false });
  sections.push({ section: "origin_id", data: getId(postId), html: false });

  browser.close();
  return sections;
};

const scrapper = (url, postId) => {
  coordinationSudScrapper(url, postId).then(jobData => {
    // console.log(jobData.filter(data => data.section === "origin_id")[0].data);
    return database("jobs")
      .insert({
        title: jobData.filter(data => data.section === "title")
          ? jobData.filter(data => data.section === "title")[0].data
          : null,
        body: jobData.filter(data => data.section === "Description")
          ? jobData.filter(data => data.section === "Description")[0].data
          : null,
        body_html: jobData.filter(
          data => data.section === "Description" && data.html
        )
          ? jobData.filter(
              data => data.section === "Description" && data.html
            )[0].data
          : null,
        // how_to_apply_html: ,
        // status: ,
        // how_to_apply: ,
        // org_name: ,
        // org_shortname: ,
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
        // country: ,
        // region_type: ,
        // city: ,
        // source: ,
        // file: ,
        // original_posting_date: ,
        // closing_date: ,
        origin_source: "coordinationSud",
        origin_id: jobData.filter(data => data.section === "origin_id")
          ? jobData.filter(data => data.section === "origin_id")[0].data
          : null
      })
      .then(res => {
        // return
        console.log(res.rowCount);
      })
      .catch(err => console.log(err));
  });
};

module.exports = scrapper;
