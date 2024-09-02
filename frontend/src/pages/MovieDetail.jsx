import React from "react";
import { useParams } from "react-router-dom";
import { IMAGE_BASE_URL } from "../constants";
import { BiLink } from "react-icons/bi";
import { BiLogoImdb } from "react-icons/bi";
import { useGetMovieByIdQuery } from "../slices/moviesApiSlice";
import Loader from "../components/Loader";
import StarRating from "../components/StarRating";

const Detail = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useGetMovieByIdQuery(id);


  // Safeguard for accessing properties
  const movie = data?.movie || {};
  const cast = data?.cast || [];
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <div className="my-5 text-red-600 text-lg">{error.data?.message || 'An error occurred'}</div>
      ) : (
        <div className="sm:grid grid-cols-12 gap-8 my-3">
          <div className="col-span-4 overflow-hidden">
            <img
              src={`${IMAGE_BASE_URL}/${movie.poster_path}`}
              alt="poster"
              className="w-full rounded object-cover"
            />
          </div>
          <div className="col-span-8 flex flex-col gap-4">
            <div className="text-[32px]">{movie.original_title}</div>
            <div className="text-[24px] text-gray-400">{movie.tagline? movie.tagline :null}</div>
          
           {/* Ratings */}
           {movie.vote_average ? (<div className="text-[16px] flex items-center gap-5"><span>{Number(movie.vote_average / 2).toFixed(2)}</span> <span> <StarRating rating={Number(movie.vote_average / 2).toFixed(2)}/></span></div>) : 'N/A'}
          
            <div className="grid grid-cols-12">
              <div className="col-span-3">
                <p className="text-[15px] text-gray-400 font-semibold">Length</p>
                <p className="text-[18px] font-semibold">{movie.runtime} min.</p>
              </div>
              <div className="col-span-4">
                <p className="text-[15px] text-gray-400 font-semibold">Language</p>
                <p className="text-[18px] font-semibold">{movie.spoken_languages[0].english_name}</p>
              </div>
              <div className="col-span-2">
                <p className="text-[15px] text-gray-400 font-semibold">Year</p>
                <p className="text-[18px] font-semibold">{movie.release_date.split("-")[0]}</p>
              </div>
              <div className="col-span-3">
                <p className="text-[15px] text-gray-400 font-semibold">Status</p>
                <p className="text-[18px] font-semibold">{movie.status}</p>
              </div>
            </div>
            <div>
              <p className="py-2 font-semibold text-[24px]">Genres</p>
              <div className="flex flex-wrap gap-4">
                {movie.genres.map((g, index) => (
                  <span
                    key={index}
                    className="bg-white text-black font-semibold px-2 rounded-md"
                  >
                    {g.name}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="py-2 font-semibold text-[24px]">Synopsis</p>
              <p className="py-1 text-[15px]">{movie.overview || "N/A"}</p>
            </div>
            <div>
              <p className="py-2 font-semibold text-[24px]">Casts</p>

              <div className="flex gap-2 flex-wrap items-center">
                {cast.map((c) => (
                  <span className="border rounded-md px-2 font-semibold">{c.name}</span>
                )) || "Not Available"}
              </div>
            </div>
            <div className="flex gap-4 py-2">
              <a href={movie.homepage} target="_blank" rel="noopener noreferrer">
                <button className="w-[120px] flex items-center justify-around rounded-sm text-white bg-custom-light-blue px-4 py-[6px]">
                  <span className="text-[15px]">Website</span>
                  <span className="text-[18px]"><BiLink /></span>
                </button>
              </a>
              <a
                href={`https://www.imdb.com/title/${movie.imdb_id}`}
                target="_blank"  rel="noopener noreferrer"
              >
                <button className="w-[120px] flex items-center justify-around rounded-sm text-white bg-custom-light-blue px-4 py-2">
                  <span className="text-[13px]">IMDB</span>
                  <span className="text-[13px]"><BiLogoImdb /></span>
                </button>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Detail;
