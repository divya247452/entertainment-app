import { MOVIES_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const moviesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMovies: builder.query({
      query: ({ keyword }) =>({
        url: MOVIES_URL,
        params: {
          keyword
        } ,
      keepUnusedDataFor: 5,})
    }),
    getMovieById:builder.query({
      query: (id) => `${MOVIES_URL}/${id}`, // Directly return the URL
      keepUnusedDataFor: 5,
    }),
  }),
});

export const { useGetMoviesQuery, useGetMovieByIdQuery } = moviesApiSlice;
