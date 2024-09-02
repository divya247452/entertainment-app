// @desc    Fetches Trending & Recommended movies/tv Series
// @route   Get /api/home
// @access  Public


const homeController = async (req, res) => {
    const { keyword } = req.query;
    try {
      const movies = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.TMDB_API}&append_to_response=videos,images`
      )
        .then((res) => res.json())
        .then((data) => data.results);
      const trendingMovies = await fetch(
        `https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.TMDB_API}&append_to_response=videos,images`
      )
        .then((res) => res.json())
        .then((data) => data.results);
  
      const tv = await fetch(
        `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.TMDB_API}&append_to_response=videos,images`
      )
        .then((res) => res.json())
        .then((data) => data.results);
      const trendingTv = await fetch(
        `https://api.themoviedb.org/3/trending/tv/week?api_key=${process.env.TMDB_API}&append_to_response=videos,images`
      )
        .then((res) => res.json())
        .then((data) => data.results);
  
  
      const trending = [ ...trendingTv, ...trendingMovies ]
  
  
      const recommend = [...movies, ...tv];
      
      if (!keyword) {
        res.status(200).json({recommend:recommend, trending:trending});
      } else {
        const filteredMovies = movies.filter((m) => m.title.toLowerCase().includes(keyword.toLowerCase()));
        const filteredSeries = tv.filter((s) => s.name.toLowerCase().includes(keyword.toLowerCase()));
        const filteredRecommend = [...filteredMovies, ...filteredSeries];
        const filteredTrending = trending.filter((t) => t.name?.toLowerCase().includes(keyword.toLowerCase()) || t.title?.toLowerCase().includes(keyword.toLowerCase()))
        res.status(200).json({filteredRecommend:filteredRecommend, filteredTrending:filteredTrending});
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  module.exports = homeController;