// const filters = {
//   experience: {
//     unknown: true,
//     "0-2": false,
//     "3-4": true,
//     "5-9": false,
//     "10+": true
//   }
// };

// const xpFilters = Object.keys(filters.experience).filter(key => filters.experience[key]);
// const xPquery = xpFilters ? xpFilters.map(filter => `xp[]=${filter}`).join("&") : null;

// ?xp[]=0-2&xp[]=3-4&xp[]=5-9

// console.log(xPquery);

// const queries = [null, null, null];

// const filters = queries.join("&");

// console.log(filters);

// const filters = {
//   experience: {
//     "0-2": false,
//     "3-4": false,
//     "5-9": true,
//     "10%2B": false
//   },
//   contract: {
//     job: false,
//     volunteer: false,
//     internship: true,
//     consultancy: true
//   }
// };

// const resetFilters = filters => {
//   const filtersClone = Object.assign({}, filters);

//   Object.keys(filtersClone).forEach(key => {
//     return Object.keys(filtersClone[key]).forEach(subKey => {
//       return (filtersClone[key][subKey] = false);
//     });
//   });
//   return filtersClone;
// };

// const checkFilters = filters => {
//   const spreadFilters = Object.values(filters);
//   const result = [];
//   for (const filter of spreadFilters) {
//     result.push(Object.values(filter));
//   }
//   return result.reduce((acc, val) => acc.concat(val), []).includes(true);
// };

// const noFilters = resetFilters(filters);
// console.log(noFilters);

const filters = {
  search: {
    userInput: false
  },
  experience: {
    "0-2": false,
    "3-4": false,
    "5-9": false,
    "10%2B": false
  },
  contract: {
    job: false,
    volunteer: false,
    internship: false,
    consultancy: false
  },
  career: {
    9999: false, // Other
    36601: false, // Logistics/Procurement
    20971: false, // Information Management
    20966: false, // Donor Relations/Grants Management
    6868: false, // Monitoring and Evaluation
    6867: false, // Program/Project Management
    6866: false, // Information and Communications Technology
    6865: false, // Advocacy/Communications
    6864: false, // Administration/Finance
    6863: false, // Human Resources
    9991: false // Training
  },
  location: {
    country: [],
    region: []
  }
};

// const resetFilters = filters => {
//   const filtersClone = Object.assign({}, filters);
//   Object.keys(filtersClone).forEach(key => {
//     return Object.keys(filtersClone[key]).forEach(subKey => {
//       if (subKey === "country" || subKey === "region") return (filtersClone[key][subKey] = []);
//       else return (filtersClone[key][subKey] = false);
//     });
//   });
//   return filtersClone;
// };

const checkFilters = filters => {
  if (filters.location.country.length !== 0 || filters.location.region.length !== 0) return true;
  const spreadFilters = Object.values(filters);
  const result = [];
  for (const filter of spreadFilters) {
    result.push(Object.values(filter));
  }
  return result.reduce((acc, val) => acc.concat(val), []).includes(true);
};

console.log(checkFilters(filters));
