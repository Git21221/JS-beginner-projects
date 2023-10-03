const express = require("express");
const {
  handleGenerateNewShortURL,
  handleAnalytics,
} = require("../controllers/url");

const router = express.Router();

router.post("/", handleGenerateNewShortURL);

router.get("/analytics/:shortId", handleAnalytics);

module.exports = router;
