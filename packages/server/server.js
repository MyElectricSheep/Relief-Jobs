require("dotenv").config({ path: "./../../.env" });
const express = require("express");
const bodyParser = require("body-parser");
const knex = require("./scripts/knex.js");

// Instantiate Express
const app = express();

// API Routes
const userRoutes = require("./api/routes/users");

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/v1/users", userRoutes);

app.get("/test", (req, res) => {
  knex("users")
    .where({ email: "test@test.com" })
    .then(rows => res.send(rows));
});

const port = process.env.PORT || 3000;

app.listen(port, () =>
  console.log(`🚀 Relief Jobs Server Online and listening on port ${port}`)
);
