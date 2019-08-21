const cron = require("node-cron");

// CRON imports
const startTokenExpiryCheckCronJob = require("../../utilities/enforceTokenExpiry");

cron.schedule("*/5 * * * *", () => {
  // http://corntab.com/?c=*/5_*_*_*_*
  // checks email registration tokens periodically (every 5 minutes) to remove expired ones
  startTokenExpiryCheckCronJob();
});
