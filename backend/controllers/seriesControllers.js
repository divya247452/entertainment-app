// @desc    Fetches All TvSeries
// @route   Get /api/tvseries
// @access  Public

const getAllSeries = async (req, res) => {
    try {
      const { keyword } = req.query;
      const data = await fetch(
        `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.TMDB_API}`
      )
        .then((res) => res.json())
        .then((data) => data.results);
  
          // If keyword is undefined or empty, return all movies
      if (!keyword) {
        return res.status(200).json(data);
      }
      const filteredSeries = data.filter((s) => s.name.toLowerCase().includes(keyword.toLowerCase()))
      res.status(200).json(filteredSeries);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }


  
// @desc    Fetches series by id
// @route   Get /api/tvseries/:id
// @access  Public

  const getSeriesById = async (req, res) => {
    try {
      const { id } = req.params;
      const castArray = await fetch(`https://api.themoviedb.org/3/tv/${id}/credits?api_key=${process.env.TMDB_API}`)
      .then((res) => res.json())
      .then((data) => data.cast)
      .then((cast) => cast.filter((c) => c.known_for_department === "Acting"))
      .then((cast) => cast.length > 10 ? cast.slice(0, 10) : cast)
  
  
      const series = await fetch(
        `https://api.themoviedb.org/3/tv/${id}?api_key=ead0e6480c3e08daa6e523f06795fd34`
      )
        .then((res) => res.json())
        
        if (series) {
          res.status(200).json({series:series, cast: castArray})
        } else {
          res.status(404).json({message: "Series not found"})
        }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  module.exports = {
    getAllSeries,
    getSeriesById
  }