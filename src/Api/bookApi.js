import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const bookApi = createApi({
  reducerPath: "apiBook",
  baseQuery: fetchBaseQuery({ baseUrl: "https://localhost:7150/api/Book" }),
  tagTypes: ["Books", "Review"],
  endpoints: (builder) => ({
    //QUERY -> GET
    //MUTATION -> POST/PUT/DELETE
    getBooks: builder.mutation({
      query: ({ pageindex, pagesize, type, keyword }) => ({
        url: "books",
        method: "POST",
        body: {
          pageIndex: pageindex,
          pageSize: pagesize,
          searchType: type,
          searhKeyword: keyword
        }
      }),

      providesTags: ["Books"]
    }),
    getSearchOptions: builder.query({
      query: (keyword) => ({
        url: "books/searchoptions",
        method: "GET",
        params: {
          keyword: keyword,

        }
      }),


    }),
    searchBooks: builder.mutation({
      query: (searchData) => ({
        url: "books/search",
        method: "POST",
        body: searchData
      }),
    }),

    getBookById: builder.query({
      query: (id) => ({
        url: `books/${id}`,
        method: "GET",
      }),
    }),
    getReviewForUser: builder.query({
      query: ({ userId, bookId }) => ({

        url: `books/reviews`,
        method: "GET",
        params: {
          userId: userId,
          bookId: bookId
        }
      }),
      providesTags: ["Review"]
    }),

    updateReviewForUser: builder.mutation({
      query: ({ userId, bookId, comment, rating }) => ({

        url: `books/review`,
        method: "PUT",
        body: {
          userId: userId,
          bookId: bookId,
          comment: comment,
          rating: rating
        }
      }),
      invalidatesTags: ["Review"]
    }),

  }),
});
export const { useGetBooksMutation, useSearchBooksMutation, useGetSearchOptionsQuery, useGetBookByIdQuery, useGetReviewForUserQuery,
  useUpdateReviewForUserMutation
} = bookApi;