const express = require("express");

const router = express.Router();

const {
  getAllMovies,
  getMoviebyId
} = require('../controllers/movieControllers')
// https://api.themoviedb.org/3/movie/533535/credits?api_key=ead0e6480c3e08daa6e523f06795fd34
router.get("/", getAllMovies);

router.get("/:id", getMoviebyId);

module.exports = router;
