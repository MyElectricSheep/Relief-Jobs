const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.send({ msg: "Relief Jobs Users Endpoint" });
});

module.exports = router;
