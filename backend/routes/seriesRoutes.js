const express = require("express");
const router = express.Router();
const {
  getAllSeries,
  getSeriesById
} = require('../controllers/seriesControllers')

router.get("/", getAllSeries);

router.get("/:id", getSeriesById);

module.exports = router;
