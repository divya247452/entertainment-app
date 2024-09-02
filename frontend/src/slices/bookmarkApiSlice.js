import { apiSlice } from "./apiSlice";
import { BOOKMARKS_URL } from "../constants";

export const bookmarksApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addBookmark: builder.mutation({
      query: (data) => ({
        url: BOOKMARKS_URL,
        method: "POST",
        body: data,
      }),
    }),
    getBookmarks: builder.query({
      query: ({ userId, keyword }) => ({
        url: `${BOOKMARKS_URL}/${userId}`,
        params: { userId, keyword },
        keepUnusedDataFor: 5,
      }),
    }),
    deleteBookmark: builder.mutation({
      query: (data) => ({
        url: `${BOOKMARKS_URL}/delete`,
        method: "DELETE",
        body: data,
      }),
    }),
  }),
});

export const {
  useAddBookmarkMutation,
  useGetBookmarksQuery,
  useDeleteBookmarkMutation,
} = bookmarksApiSlice;
