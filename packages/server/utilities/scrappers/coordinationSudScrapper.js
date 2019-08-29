const puppeteer = require("puppeteer");
const reliefWebCountries = require("../../resources/countries/reliefWebCountriesData.json");
const reliefWebOrganizations = require("../../resources/organizations/reliefWebOrganizationsData.json");
const frCountries = require("../../resources/countries/countriesFr.json");
const enCountries = require("../../resources/countries/countriesEn.json");
const getRegionType = require("../regionTypes");
const database = require("../../scripts/knex");
const {
  experienceTypes,
  organizationTypes,
  jobTypes,
  careerTypes,
  themeTypes
} = require("./reliefWebTypes");

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
  await page.goto(`${coordinationSudSpecificJobUrl}${url}`);

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
    country =>
      country.name === scrappedCountry[1] ||
      country.alternateName === scrappedCountry[1]
  );
  const targetEnCountry = enCountries.filter(
    country => country.name === scrappedCountry[1]
  );
  const targetReliefWebCountry =
    targetFrCountry.length !== 0
      ? reliefWebCountries.filter(
          country => country.fields.iso3 === targetFrCountry[0].alpha3
        )
      : targetEnCountry.length !== 0
      ? reliefWebCountries.filter(
          country => country.fields.iso3 === targetEnCountry[0].alpha3
        )
      : null;

  return targetReliefWebCountry ? targetReliefWebCountry[0].fields : null;
};

const getExperienceType = type => {
  const convertXp = xp => {
    if (xp === "0 à 3 ans" || xp === "0 to 3 years") return "0-2 years";
    if (xp === "3 à 5 ans" || xp === "3 to 5 years") return "3-4 years";
    if (xp === "5 à 10 ans" || xp === "5 to 10 years") return "5-9 years";
    if (xp === "> 10 ans" || xp === "> 10 years") return "10+ years";
    else return null;
  };

  const result = experienceTypes.filter(xp => xp.name === convertXp(type));
  return result.length !== 0 ? result[0] : "not_specified";
};

const getJobType = (arrayOfClasses, typeOrId) => {
  const possibleFrTypes = [
    "t_contrats-benevolat",
    "t_contrats-cdd",
    "t_contrats-cdi",
    "t_contrats-stage-alternance",
    "t_contrats-volontariat-service-civique"
  ];
  const possibleEnTypes = [
    "t_contrats-fixed-term-contract",
    "t_contrats-permanent-contract",
    "t_contrats-internship-study-contract",
    "t_contrats-volonteering"
  ];
  const mixTypes = (fr, en) => {
    const tempResult = [];
    fr.map(type => tempResult.push(type));
    en.map(type => tempResult.push(type));
    const result = [...new Set(tempResult)];
    return result;
  };
  const possibleTypes = mixTypes(possibleFrTypes, possibleEnTypes);
  const targetType = possibleTypes.filter(type =>
    arrayOfClasses.includes(type)
  );
  if (targetType.length !== 0) {
    const result = jobTypes.filter(job => {
      if (
        job.className === targetType[0] ||
        job.classNameAlternate === targetType[0] ||
        job.classNameEn === targetType[0] ||
        job.classNameEnAlternate === targetType[0]
      )
        return job;
    });
    return result.length !== 0
      ? typeOrId === "type"
        ? result[0].reliefJobsName
        : result[0].id
      : "other";
  } else return null;
};

const getOrganization = org => {
  const targetOrg = reliefWebOrganizations.filter(
    organization =>
      organization.fields.name.trim().toLowerCase() ===
        org.trim().toLowerCase() || organization.fields.longname === org
  );
  return targetOrg.length !== 0 ? targetOrg[0] : null;
};

const getOrganizationType = type => {
  const result = organizationTypes.filter(org => org.id === type);
  return result.length !== 0 ? result[0].reliefJobsName : "other";
};

const getCareerType = type => {
  const result = {
    careerTypes: []
  };

  const scrappedCareerTypes = type.data.split(",").map(el => el.trim());

  const possibleFrTypes = [
    "Autre",
    "Communication",
    "Direction et administration",
    "Dons/collecte",
    "Formation",
    "Gestion de projets/programmes",
    "Plaidoyer et Recherches",
    "RH et Finances",
    "Services et Logistique",
    "Technicien spécialisé"
  ];

  const possibleEnTypes = [
    "Other",
    "Advocacy & Research",
    "Communication",
    "Fundraising",
    "Human resources & Financial services",
    "Logistic & Office support",
    "Management & Administration",
    "Program/Project management",
    "Specialized technician",
    "Training"
  ];

  const targetFrTypes = possibleFrTypes.filter(type =>
    scrappedCareerTypes.includes(type)
  );
  const targetEnTypes = possibleEnTypes.filter(type =>
    scrappedCareerTypes.includes(type)
  );
  const mixTypes = (fr, en) => {
    const tempResult = [];
    fr.map(type => tempResult.push(type));
    en.map(type => tempResult.push(type));
    const result = [...new Set(tempResult)];
    return result;
  };
  const targetTypes = mixTypes(targetFrTypes, targetEnTypes);
  if (targetTypes.length !== 0) {
    targetTypes.map(target => {
      return careerTypes.filter(career => {
        if (
          career.coordinationSudName === target ||
          career.coordinationSudAlternate === target ||
          career.coordinationSudEnName === target ||
          career.coordinationSudEnAlternateName === target
        )
          return result.careerTypes.push(career);
      });
    });
  } else {
    result.careerTypes.push(careerTypes[0]);
  }
  if (result.careerTypes.length !== 0) return result;
  else return null;
};

const getThemeType = type => {
  const result = {
    themeTypes: []
  };

  const scrappedThemeTypes = type.data.split(",").map(el => el.trim());

  const possibleFrTypes = [
    "Autre",
    "Eau et assainissement",
    "Droits humains",
    "Santé",
    "Genre",
    "Alimentation / Nutrition",
    "Education / Formation",
    "Gestion crise / post-crise",
    "Environnement / Climat",
    "Agriculture",
    "Migration",
    "Développement économique et local"
  ];

  const possibleEnTypes = [
    "Other",
    "Advocacy",
    "Agriculture",
    "Crisis & Post-crisis management",
    "Economic & local development",
    "Education / Training",
    "Environment & Climate",
    "Fair trade",
    "Food & Nutrition",
    "Gender",
    "Health",
    "Human rights",
    "Migration",
    "Water sanitation & Hygiene"
  ];

  const targetFrTypes = possibleFrTypes.filter(type =>
    scrappedThemeTypes.includes(type)
  );
  const targetEnTypes = possibleEnTypes.filter(type =>
    scrappedThemeTypes.includes(type)
  );

  const mixTypes = (fr, en) => {
    const tempResult = [];
    fr.map(type => tempResult.push(type));
    en.map(type => tempResult.push(type));
    const result = [...new Set(tempResult)];
    return result;
  };
  const targetTypes = mixTypes(targetFrTypes, targetEnTypes);

  if (targetTypes.length !== 0) {
    targetTypes.map(target => {
      return themeTypes.filter(theme => {
        if (
          theme.coordinationSudName === target ||
          theme.coordinationSudEnName === target
        )
          return result.themeTypes.push(theme);
      });
    });
  } else {
    result.themeTypes.push(themeTypes[0]);
  }

  return result;
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
      await page.goto(coordinationSudListOfJobsUrl);

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
