const fs = require("fs");
const fr = require("./countriesFr.json");
const en = require("./countriesEn.json");

const frSliced = fr.slice(0, fr.length);
const enSliced = en.slice(0, en.length);

const result = enSliced.map(country => {
  frSliced.map(pays => {
    if (country.id === pays.id) {
      if (pays.name) {
        country["frName"] = pays.name;
      }
      if (pays.alternateName) {
        country["frAlternateName"] = pays.alternateName;
      }
    }
  });
});

// console.log(enSliced);

fs.writeFileSync("combinedCountries.json", JSON.stringify(enSliced, null, 2));
