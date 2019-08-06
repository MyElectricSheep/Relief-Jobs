const express = require("express");
const bodyParser = require("body-parser");

// Instantiate Express
const app = express();

// API Routes
const userRoutes = require("./api/routes/users");

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/v1/users", userRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () =>
  console.log(`🚀 Relief Jobs Server Online and listening on port ${port}`)
);
