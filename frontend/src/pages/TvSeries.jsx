import React from 'react'
import { useGetTvseriesQuery } from '../slices/tvseriesApiSlice'
import Card from '../components/Card';
import Loader from '../components/Loader';
import { useParams, useLocation } from 'react-router-dom';

const TvSeries = () => {
  const { keyword } = useParams()
    const { data: items, isLoading, error} = useGetTvseriesQuery({ keyword })
    const location = useLocation();
    const isSearchInUrl = location.pathname.includes("/search");

  return (
    <>
    {isLoading ? (
      <Loader/>
    ) : error ? (
     <div className="my-5 text-red-600 text-lg">{error?.data?.message || "An Error Occured"}</div>

    ) :  (
      <>
        <div className="text-[24px] font-semibold my-5">Tv Shows</div>
        {isSearchInUrl && <div className="pb-5 text-[18px] font-semibold">{`Found ${items.length} results for '${keyword}' in Tv Series`}</div>}
        <Card items={items} />
      </>
    ) }
  </>
 
  )
}

export default TvSeries