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

const filters = {
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
  }
};

// const checkFilters = filters => {
//   const spreadFilters = Object.values(filters);
//   const result = [];
//   for (const filter of spreadFilters) {
//     result.push(Object.values(filter));
//   }
//   return result.reduce((acc, val) => acc.concat(val), []).includes(true);
// };

const resetFilters = filters => {};

console.log(resetFilters(filters));
