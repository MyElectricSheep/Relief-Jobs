const cron = require("node-cron");

// CRON imports
const reliefWebScrapper = require("../../utilities/scrappers/reliefWebScrapper");

cron.schedule("*/1 * * * *", () => {
  // http://corntab.com/?c=*/10_*_*_*_*
  // Scraps the ReliefWeb jobs database to retrieve latest added jobs every 10 minutes
  reliefWebScrapper();
});
