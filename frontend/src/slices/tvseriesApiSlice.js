import { apiSlice } from "./apiSlice";
import { TVSERIES_URL } from "../constants";

export const tvseriesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTvseries: builder.query({
      query: ({ keyword }) => ({
        url: TVSERIES_URL,
        params: {
          keyword
        } ,
        keepUnusedDataFor: 5,
      }),
    }),
    getTvSeriesById: builder.query({
      query: (id) => `${TVSERIES_URL}/${id}`,
      keepUnusedDataFor: 5,
    }),
  }),
});

export const { useGetTvseriesQuery, useGetTvSeriesByIdQuery } =
  tvseriesApiSlice;
