import React from "react";
import Card from "../components/Card";
import { useGetHomeQuery } from "../slices/homeApiSlice";
import Trending from "../components/Trending";
import Loader from "../components/Loader";
import { useParams, useLocation } from "react-router-dom";

const Home = () => {
  const { keyword = "" } = useParams();
  const { data, isLoading, error } = useGetHomeQuery({
    keyword,
  });
  const location = useLocation();
  const isSearchInUrl = location.pathname.includes("/search");

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <div className="my-5 text-red-600 text-lg">
          {error?.data?.message || "An Error Occured"}
        </div>
      ) : (
        <>
          <div className="text-[24px] font-semibold my-3">Trending</div>
          <div>
            {isSearchInUrl && (
              <div className="pb-5 text-[18px]">{`Found ${data.filteredTrending?.length} results for '${keyword}' in Trending`}</div>
            )}

            {!isSearchInUrl && data.trending?.length === 0 ? (
              <div className="text-red-600 text-[18px] font-semibold">
                No Data in Trending
              </div>
            ) : (
              <Trending items={data.trending || data.filteredTrending} />
            )}
          </div>
          <div className="text-[24px] font-semibold my-5">Recommended For You</div>
          {isSearchInUrl && (
            <div className="pb-5 text-[18px]">{`Found ${data.filteredRecommend?.length} results for '${keyword}' in Recommendations`}</div>
          )}

          {!isSearchInUrl && data.recommend?.length === 0 ? (
            <div className="text-red-600 text-[18px] font-semibold">
              No Data in Recommends
            </div>
          ) : (
            <Card items={data.recommend || data.filteredRecommend} />
          )}
        </>
      )}
    </>
  );
};

export default Home;
