import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useParams, useNavigate, useLocation } from "react-router-dom";

const SearchBox = () => {
  const navigate = useNavigate();
  const { keyword: urlKeyword } = useParams();

  // FIX: uncontrolled input - urlKeyword may be undefined
  const [keyword, setKeyword] = useState(urlKeyword || "");

  const location = useLocation();
  const isBookmarksInUrl = location.pathname.includes("/bookmarks");
  const isMoviesInUrl = location.pathname.includes("/movies");
  const isTvSeriesInUrl = location.pathname.includes("/tvseries");

  //  Search Box will not be available on the foolowing Pages
  const pathsToDisableSearch = [
    "/moviedetail",
    "/tvseriesdetail",
    "/login",
    "/signup",
  ];
  const disableSearch = pathsToDisableSearch.some((path) =>
    location.pathname.includes(path)
  );

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword) {
      if (isMoviesInUrl) {
        navigate(`/movies/search/${keyword.trim()}`);
      } else if (isTvSeriesInUrl) {
        navigate(`/tvseries/search/${keyword.trim()}`);
      } else if (isBookmarksInUrl) {
        navigate(`/bookmarks/search/${keyword.trim()}`);
      } else {
        navigate(`/search/${keyword.trim()}`);
      }
      setKeyword("");
    } else {
      navigate("/");
    }
  };

  return (
    <>
      {!disableSearch && (
        <form onSubmit={submitHandler} className=" relative">
          <input
            type="text"
            value={keyword}
            placeholder={`Search for ${
              isBookmarksInUrl
                ? "Bookmarked Movies or TV series"
                : isMoviesInUrl
                ? "Movies"
                : isTvSeriesInUrl
                ? "Tv Series"
                : "Movies or TV series"
            }`}
            onChange={(e) => setKeyword(e.target.value)}
            className="ml-[40px] w-[calc(100%-35px)] bg-custom-dark-blue text-xl py-2 border-0 focus:border-b-2 border-custom-light-blue  outline-none caret-custom-red"
          />

          <button
            type="submit"
            className="absolute top-[12px]  flex items-center text-xl"
            aria-label="search"
          >
            <FaSearch />
          </button>
        </form>
      )}
    </>
  );
};

export default SearchBox;
