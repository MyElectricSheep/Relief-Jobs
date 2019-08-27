require("dotenv").config({ path: "./../../.env" });
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const knex = require("./scripts/knex.js");
const helmet = require("helmet");
const cors = require("cors");

const app = express();

// CRON Jobs
const tokensExpiryCheck = require("./scripts/backgroundJobs/tokens");
const reliefWebJobsScrapper = require("./scripts/backgroundJobs/reliefWeb");
const scrapper = require("./utilities/scrappers/coordinationSudScrapper");
scrapper(
  "republique-democratique-du-congo-chargee-de-projet-distribution-bukavu",
  "post-250653"
);

// CORS Security (only allows the ReliefJobs front-end to access the API)
const frontEndOrigin = `http://${
  process.env.NODE_ENV === "production"
    ? process.env.PROD_HOST_FRONT
    : process.env.DEV_HOST_FRONT
}:${
  process.env.NODE_ENV === "production"
    ? process.env.PROD_PORT_FRONT
    : process.env.DEV_PORT_FRONT
}`;
const whitelist = [frontEndOrigin];
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Blocked by CORS policy"));
    }
  }
};
app.use(cors(corsOptions));

// Other Middlewares
app.use(helmet());
if (process.env.NODE_ENV !== "test") {
  app.use(morgan("short"));
}
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// API Routes
const userRoutes = require("./api/routes/users");
const jobsRoutes = require("./api/routes/jobs");

app.use("/v1/users", userRoutes);
app.use("/v1/jobs", jobsRoutes);

const port = process.env.PORT || 3000;

module.exports = app.listen(port, () =>
  console.log(`🚀 Relief Jobs Server Online and listening on port ${port}`)
);
