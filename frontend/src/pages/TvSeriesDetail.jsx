import React from "react";
import { useParams } from "react-router-dom";
import { IMAGE_BASE_URL } from "../constants";
import { BiLink } from "react-icons/bi";
import StarRating from "../components/StarRating";
import Loader from "../components/Loader";
import { useGetTvSeriesByIdQuery } from "../slices/tvseriesApiSlice";

const TvSeriesDetail = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useGetTvSeriesByIdQuery(id);

  // Safeguard for accessing properties handles undefined
  const series = data?.series || {};
  const cast = data?.cast || [];

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <p className="text-[18px] text-custom-red">{error?.data?.message || error?.message || "An error occurred"}</p> 
      ) : (
        <div className="sm:grid grid-cols-12 gap-8 my-5">
          <div className="col-span-4 overflow-hidden">
            {series.poster_path ? (
              <img
                src={`${IMAGE_BASE_URL}/${series.poster_path}`}
                alt="poster"
                className="w-full object-cover rounded"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">No Image Available</div>
            )}
          </div>
          <div className="col-span-8 flex flex-col gap-4">
            <div className="text-[32px]">
              {series.name || series.original_name || 'No Name Available'}
            </div>

            {/* Ratings */}
              {series.vote_average ? (<div className="text-[18px] flex items-center gap-5"><span>{Number(series.vote_average / 2).toFixed(2)}</span> <span> <StarRating rating={Number(series.vote_average / 2).toFixed(2)}/></span></div>) : 'N/A'}
          

            <div className="grid grid-cols-12">
             
              <div className="col-span-3">
                <p className="text-[15px] text-gray-400 font-semibold">Language</p>
                <p className="text-[18px] font-semibold">{series.spoken_languages?.[0]?.english_name || 'N/A'}</p>
              </div>
              <div className="col-span-3">
                <p className="text-[15px] text-gray-400 font-semibold">First Air</p>
                <p className="text-[18px] font-semibold">{series.first_air_date ? `${series.first_air_date}` : 'N/A'}</p>
              </div>
              <div className="col-span-3">
                <p className="text-[15px] text-gray-400 font-semibold">Last Air</p>
                <p className="text-[18px] font-semibold">{series.last_air_date ? `${series.last_air_date}` : 'N/A'}</p>
              </div>
              <div className="col-span-3">
                <p className="text-[15px] text-gray-400 font-semibold">Status</p>
                <p className="text-[18px] font-semibold">{series.status || 'N/A'}</p>
              </div>
            </div>
            <div>
              <p className="py-2 font-semibold text-[24px]">Genres</p>
              <div className="flex flex-wrap gap-4">
                {series.genres?.map((g) => (
                  <span key={g.id} className="bg-white text-black font-semibold px-2 rounded">{g.name}</span>
                )) || 'No Genres Available'}
              </div>
            </div>
            <div>
              <p className="font-semibold py-2 text-[24px]">Synopsis</p>
              <p className="py-1 text-[15px]">{series.overview || 'No Synopsis Available'}</p>
            </div>
            <div>
              <p className="py-2 font-semibold text-[24px]">Casts</p>
              <div className="flex gap-2 flex-wrap items-center">
                {cast.map((c) => (
                  <span key={c.id} className="border rounded-md px-2 font-semibold">{c.name}</span>
                )) || 'No Cast Available'}
              </div>
            </div>
            <div className="py-2">
              {series.homepage ? (
                <a href={series.homepage} target="_blank" rel="noopener noreferrer">
                  <button className="w-[120px] flex items-center justify-around rounded-sm text-white bg-custom-light-blue px-4 py-[6px]">
                    <span  className="text-[15px]">Website</span>
                    <span className="text-[18px]"><BiLink/></span>
                 
                  </button>
                </a>
              ) : <span className="text-custom-red">Website unavailable</span>}
              
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TvSeriesDetail;
