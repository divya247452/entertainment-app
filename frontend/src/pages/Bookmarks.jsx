import React from "react";
import Card from "../components/Card";
import { useGetBookmarksQuery } from "../slices/bookmarkApiSlice";
import { useSelector } from "react-redux";
import Loader from "../components/Loader";
import { useParams, useLocation } from "react-router-dom";
const Bookmarks = () => {

  const { keyword } = useParams()

  const { userInfo } = useSelector((state) => state.auth);
  const userId = userInfo?._id;

  const { data, isLoading, error, refetch } = useGetBookmarksQuery({ userId, keyword },  {
    refetchOnMountOrArgChange: true,
  });

  const location = useLocation();
  const isSearchInUrl = location.pathname.includes("/search");

  const movies = data?.filter((item) => item.title);
  const series = data?.filter((item) => item.name);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <div className="my-5 text-red-600 text-lg">{error?.data?.message || "An Error Occured"}</div>
      ) : (
        <div>
          <div className="my-5">
            <div className="mb-5 text-[24px]">Bookmarked Movies</div>
            {isSearchInUrl && <div className="pb-5 text-[24px]">{`Found ${movies.length} results for '${keyword}' in bookmarked movies`}</div> }
            {!isSearchInUrl && movies.length === 0 ? (
              <div className="text-red-600 font-semibold">You have not Bookmarked any movie</div>
            ) : (
              <Card items={movies} refetchBookmarks={refetch} />
            )}
            <div className="my-5 text-[24px]">Bookmarked Tv Series</div>
            {isSearchInUrl && <div className="pb-5 text-[24px]">{`Found ${series.length} results for '${keyword}' in bookmarked Tv series`}</div> }
            {!isSearchInUrl && series.length === 0 ? (
              <div className="text-red-600 font-semibold">You have not Bookmarked any Tv Shows</div>
            ) : (
              <Card items={series} refetchBookmarks={refetch} />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Bookmarks;
