const filters = {
  experience: {
    unknown: true,
    "0-2": false,
    "3-4": false,
    "5-9": false,
    "10+": true
  }
};

const xpFilters = Object.keys(filters.experience).filter(key => filters.experience[key]);
const xPquery = xpFilters ? xpFilters.map(filter => `xp[]=${filter}`).join("&") : null;

// ?xp[]=0-2&xp[]=3-4&xp[]=5-9

console.log(xPquery);
