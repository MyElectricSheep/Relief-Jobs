require("dotenv").config({ path: "./../../.env" });
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const knex = require("./scripts/knex.js");

// Instantiate Express
const app = express();

// Checks email registration tokens periodically to remove expired ones
const enforceTokenExpiry = require("./utilities/enforceTokenExpiry");

// Middlewares
if (process.env.NODE_ENV !== "test") {
  app.use(morgan("short"));
}
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// API Routes
const userRoutes = require("./api/routes/users");

app.use("/v1/users", userRoutes);

const port = process.env.PORT || 3000;

module.exports = app.listen(port, () =>
  console.log(`🚀 Relief Jobs Server Online and listening on port ${port}`)
);
