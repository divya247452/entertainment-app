// @desc    Fetches All movies
// @route   Get /api/movies
// @access  Public

const getAllMovies = async (req, res) => {
  try {
    const { keyword } = req.query;
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.TMDB_API}&append_to_response=videos,images`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch movies');
    }

    const data = await response.json();
    const movies = data.results;

    // If keyword is undefined or empty, return all movies
    if (!keyword) {
      return res.status(200).json(movies);
    }

    const lcKeyword = keyword.toLowerCase();
    const filteredMovies = movies.filter((m) => m.title.toLowerCase().includes(lcKeyword));

    res.status(200).json(filteredMovies);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch movies" });
  }
};


// @desc    Fetches movie by id
// @route   Get /api/movies/:id
// @access  Public

const getMoviebyId = async (req, res) => {
  try {
    const id = req.params.id;
    const castArray = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.TMDB_API}`
    )
      .then((res) => res.json())
      .then((data) => data.cast)
      .then((cast) => cast.filter((c) => c.known_for_department === "Acting"))
      .then((cast) => (cast.length > 10 ? cast.slice(0, 10) : cast));

    const movie = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_API}&append_to_response=videos,images`
    ).then((res) => res.json());
    if (movie) {
      res.status(200).json({ movie: movie, cast: castArray });
    } else {
      res.status(404).json({ message: "movie not found" });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  getAllMovies,
  getMoviebyId,
};
