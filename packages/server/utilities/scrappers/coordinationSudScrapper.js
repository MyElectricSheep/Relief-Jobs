const puppeteer = require("puppeteer");

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
      result.push({ section: el.section, data: section });
    }

    return result;
  });

  browser.close();
  return sections;
};

coordinationSudScrapper(
  "coordinateur-logistique-madagascar",
  "post-255592"
).then(value => {
  console.log(value); // Success!
});
