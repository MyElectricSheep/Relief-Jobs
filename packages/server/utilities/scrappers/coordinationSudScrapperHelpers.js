const stringSimilarity = require("string-similarity");
const reliefWebCountries = require("../../resources/countries/reliefWebCountriesData.json");
const reliefWebOrganizations = require("../../resources/organizations/reliefWebOrganizationsData.json");
const frCountries = require("../../resources/countries/countriesFr.json");
const enCountries = require("../../resources/countries/countriesEn.json");
const {
  experienceTypes,
  organizationTypes,
  jobTypes,
  careerTypes,
  themeTypes
} = require("./reliefWebTypes");

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
  const normalizedScrappedOrgName = org.trim().toLowerCase();
  const getNormalizedOrgName = organization => {
    return organization.fields.name
      ? organization.fields.name.trim().toLowerCase()
      : "OrgNameNotFound";
  };
  const getNormalizedOrgLongName = organization => {
    return organization.fields.longname
      ? organization.fields.longname.trim().toLowerCase()
      : "OrgNameNotFound";
  };
  const getNormalizeOrgShortName = organization => {
    return organization.fields.shortname
      ? organization.fields.shortname.trim().toLowerCase()
      : "OrgNameNotFound";
  };

  let targetOrg = [];

  const orgNames = reliefWebOrganizations.map(org =>
    org.fields.name
      ? org.fields.name.trim().toLowerCase()
      : null && org.fields.shortname
      ? org.fields.shortname.trim().toLowerCase()
      : null && org.fields.longname
      ? org.fields.longname.trim().toLowerCase()
      : null
  );
  const bestMatchNames = stringSimilarity.findBestMatch(
    normalizedScrappedOrgName,
    orgNames
  );
  // findBestMatch returns a fraction between 0 and 1, which indicates the degree of similarity between the two strings
  // 0.6 appears to be a good compromise between a good match and a false positive
  if (bestMatchNames.bestMatch.rating < 0.6) {
    targetOrg = reliefWebOrganizations.filter(
      organization =>
        getNormalizedOrgName(organization) === normalizedScrappedOrgName ||
        getNormalizedOrgLongName(organization) === normalizedScrappedOrgName ||
        getNormalizeOrgShortName(organization) === normalizedScrappedOrgName
    );
  } else {
    targetOrg = reliefWebOrganizations.filter(
      organization =>
        getNormalizedOrgName(organization) ===
          bestMatchNames.bestMatch.target ||
        getNormalizedOrgLongName(organization) ===
          bestMatchNames.bestMatch.target ||
        getNormalizeOrgShortName(organization) ===
          bestMatchNames.bestMatch.target
    );
  }
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

module.exports = {
  getDate,
  getCountry,
  getExperienceType,
  getJobType,
  getOrganization,
  getOrganizationType,
  getCareerType,
  getThemeType
};
