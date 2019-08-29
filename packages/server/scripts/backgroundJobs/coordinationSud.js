const cron = require("node-cron");

// CRON imports
const coordinationSudScrapper = require("../../utilities/scrappers/coordinationSudScrapper");

cron.schedule("*/1 * * * *", () => {
  // http://corntab.com/?c=*/12_*_*_*_*
  // Scraps the Coordination Sud jobs database to retrieve latest added jobs every 12 minutes
  coordinationSudScrapper();
});
