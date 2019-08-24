const puppeteer = require("puppeteer");

let coordinationSudScrapper = async (url, postId) => {
  const coordinationSudUrl = "https://www.coordinationsud.org/offre-emploi/";
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(`${coordinationSudUrl}${url}`);

  const result = await page.evaluate(postId => {
    let data = [];
    const title = document.querySelector(`#${postId} > header > h1`)
      ? document.querySelector(`#${postId} > header > h1`).innerText
      : null;
    const bodyText = document.querySelector(
      `#${postId} > div > table > tbody > tr:nth-child(1) > td`
    )
      ? document.querySelector(
          `#${postId} > div > table > tbody > tr:nth-child(1) > td`
        ).innerText
      : null;
    const bodyHtml = document.querySelector(
      `#${postId} > div > table > tbody > tr:nth-child(1) > td`
    )
      ? document.querySelector(
          `#${postId} > div > table > tbody > tr:nth-child(1) > td`
        ).innerHTML
      : null;
    const city = document.querySelector(
      `#${postId} > div > table > tbody > tr:nth-child(2) > td`
    )
      ? document.querySelector(
          `#${postId} > div > table > tbody > tr:nth-child(2) > td`
        ).innerText
      : null;
    const requiredText = document.querySelector(
      `#${postId} > div > table > tbody > tr:nth-child(3) > td > p`
    )
      ? document.querySelector(
          `#${postId} > div > table > tbody > tr:nth-child(3) > td > p`
        ).innerText
      : null;
    const requiredHtml = document.querySelector(
      `#${postId} > div > table > tbody > tr:nth-child(3) > td > p`
    )
      ? document.querySelector(
          `#${postId} > div > table > tbody > tr:nth-child(3) > td > p`
        ).innerHTML
      : null;
    const experience = document.querySelector(
      `#${postId} > div > table > tbody > tr:nth-child(4) > td`
    )
      ? document.querySelector(
          `#${postId} > div > table > tbody > tr:nth-child(4) > td`
        ).innerText
      : null;
    const careerType = document.querySelector(
      `#${postId} > div > table > tbody > tr:nth-child(5) > td`
    )
      ? document.querySelector(
          `#${postId} > div > table > tbody > tr:nth-child(5) > td`
        ).innerText
      : null;
    const themeType = document.querySelector(
      `#${postId} > div > table > tbody > tr:nth-child(6) > td`
    )
      ? document.querySelector(
          `#${postId} > div > table > tbody > tr:nth-child(6) > td`
        ).innerText
      : null;
    const regionCountry = document.querySelector(
      `#${postId} > div > table > tbody > tr:nth-child(7) > td`
    )
      ? document.querySelector(
          `#${postId} > div > table > tbody > tr:nth-child(7) > td`
        ).innerText
      : null;
    const salary = document.querySelector(
      `#${postId} > div > table > tbody > tr:nth-child(8) > td > p`
    )
      ? document.querySelector(
          `#${postId} > div > table > tbody > tr:nth-child(8) > td > p`
        ).innerText
      : null;
    const howToApplyFullText = document.querySelector(
      `#${postId} > div > table > tbody > tr:nth-child(9) > td > p`
    )
      ? document.querySelector(
          `#${postId} > div > table > tbody > tr:nth-child(9) > td > p`
        ).innerText
      : null;
    const howToApplyFullHtml = document.querySelector(
      `#${postId} > div > table > tbody > tr:nth-child(9) > td > p`
    )
      ? document.querySelector(
          `#${postId} > div > table > tbody > tr:nth-child(9) > td > p`
        ).innerHTML
      : null;
    const howToApplyUrl = document.querySelector(
      `#${postId} > div > table > tbody > tr:nth-child(10) > td > a`
    )
      ? document.querySelector(
          `#${postId} > div > table > tbody > tr:nth-child(10) > td > a`
        ).innerText
      : null;

    const closingDate = document.querySelector(
      `#${postId} > div > table > tbody > tr:nth-child(11) > td`
    )
      ? document.querySelector(
          `#${postId} > div > table > tbody > tr:nth-child(11) > td`
        ).innerText
      : null;

    data.push({
      title,
      bodyText,
      bodyHtml,
      city,
      requiredText,
      requiredHtml,
      experience,
      careerType,
      themeType,
      regionCountry,
      salary,
      howToApplyFullText,
      howToApplyFullHtml,
      howToApplyUrl,
      closingDate
    });

    return data;
  }, postId);

  browser.close();
  return result;
};

coordinationSudScrapper(
  "directeur-territorial-paris-75-h-f-1566591648",
  "post-255601"
).then(value => {
  console.log(value); // Success!
});

// for (var element of elements) {
//   // Loop through each proudct
//   let title = document.querySelector(".entry-title").innerText; // Select the title

//   data.push({ title }); // Push an object with the data onto our array
// }

// #post-255592 > div > table > tbody > tr:nth-child(1) > th
