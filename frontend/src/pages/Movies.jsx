import React, { useEffect } from "react";
import Card from "../components/Card";
import { useGetMoviesQuery } from "../slices/moviesApiSlice";
import Loader from "../components/Loader";
import { useParams, useLocation } from "react-router-dom";

const Movies = () => {
  const { keyword } = useParams()
  const { data: items, isLoading, error } = useGetMoviesQuery({
    keyword
  }); 
  
  const location = useLocation();
  const isSearchInUrl = location.pathname.includes("/search");
  
useEffect(()=>{

},[items])
  return (
    <>
      {isLoading ? (
        <Loader/>
      ) : error ? (
        <p className="text-[18px] text-custom-red">{error?.data?.message || error?.message}</p> 
      ) :  (
        <>
          <div className="text-[24px] font-semibold my-5">Movies</div>
          {isSearchInUrl && <div className="pb-5 text-[18px] font-semibold">{`Found ${items.length} results for '${keyword}' in Movies`}</div>}

          <Card items={items} />
        </>
      )}
    </>
  );
};

export default Movies;