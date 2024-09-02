import { apiSlice } from "./apiSlice";
import { HOME_URL } from "../constants";

export const homeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getHome: builder.query({
      query: ({ keyword }) => ({
        url: HOME_URL,
        params: { keyword },
        keepUnusedDataFor: 5,
      }),
    }),
  }),
});

export const { useGetHomeQuery } = homeApiSlice;
