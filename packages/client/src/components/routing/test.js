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
    "5-9": true,
    "10%2B": false
  },
  contract: {
    job: false,
    volunteer: false,
    internship: true,
    consultancy: true
  }
};

const resetFilters = filters => {
  const filtersClone = Object.assign({}, filters);

  Object.keys(filtersClone).forEach(key => {
    return Object.keys(filtersClone[key]).forEach(subKey => {
      return (filtersClone[key][subKey] = false);
    });
  });
  return filtersClone;
};

// const checkFilters = filters => {
//   const spreadFilters = Object.values(filters);
//   const result = [];
//   for (const filter of spreadFilters) {
//     result.push(Object.values(filter));
//   }
//   return result.reduce((acc, val) => acc.concat(val), []).includes(true);
// };

const noFilters = resetFilters(filters);
console.log(noFilters);
