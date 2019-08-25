const puppeteer = require("puppeteer");
const database = require("../../scripts/knex");

let coordinationSudScrapper = async (url, postId) => {
  const coordinationSudUrl = "https://www.coordinationsud.org/offre-emploi/";
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(`${coordinationSudUrl}${url}`);

  const getSectionResult = async postId => {
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

  const sections = await getSectionResult(postId).then(async res => {
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

  browser.close();
  return sections;
};

coordinationSudScrapper(
  "directeur-territorial-paris-75-h-f-1566591648",
  "post-255601"
).then(value => {
  console.log(value); // Success!
});
