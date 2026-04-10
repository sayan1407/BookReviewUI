import { createApi } from "@reduxjs/toolkit/query/react";
import createCustomBaseQuery from "./baseQuery";

export const bookApi = createApi({
  reducerPath: "apiBook",
  baseQuery: createCustomBaseQuery("https://bookreviewservice-hzhvcyghehf2hhcu.canadacentral-01.azurewebsites.net/api/Book"),
  tagTypes: ["Books", "Review"],
  endpoints: (builder) => ({
    //QUERY -> GET
    //MUTATION -> POST/PUT/DELETE
    getBooks: builder.mutation({
      query: ({ pageindex, pagesize, type, keyword }) => ({
        url: `books`,
        method: "POST",
        body: {
          searchType: type,
          searhKeyword: keyword,
          pageindex: pageindex,
          pagesize: pagesize
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
        },
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
        },
      }),
      invalidatesTags: ["Review"]
    }),
    getReviewsByBookId: builder.query({
      query: ({ bookId, pageIndex, pageSize }) => ({
        url: `books/reviews/${bookId}`,
        method: 'GET',
        params: {
          pageIndex: pageIndex,
          pageSize: pageSize
        },
      })
    }),

    getRecommendedBooks: builder.query({
      query: ({ userId }) => ({
        url: `books/recommendedbooks/${userId}`,
        method: 'GET',
      })
    }),

    getUserLibrary: builder.query({
      query: ({ userId }) => ({
        url: `books/users/library`,
        params: {
          userid : userId
        },
        method: 'GET',
      }),
      providesTags : ["Library"]
    }),
    
    updateUserLibrary: builder.mutation({
      query: ({ userId, bookId }) => ({
        url: `books/users/library`,
        body: {
          userId : userId,
          bookId : bookId
        },
        method: 'POST',
      })
    }),

    removeUserLibrary: builder.mutation({
      query: ({ userId, bookId }) => ({
        url: `books/users/library`,
        body: {
          userId : userId,
          bookId : bookId
        },
        method: 'DELETE',
      }),
      invalidatesTags: ["Library"]
    })


  }),
});
export const { useGetBooksMutation, useSearchBooksMutation, useGetSearchOptionsQuery, useGetBookByIdQuery, useGetReviewForUserQuery,
  useUpdateReviewForUserMutation, useGetReviewsByBookIdQuery, useGetRecommendedBooksQuery,
  useGetUserLibraryQuery, useUpdateUserLibraryMutation, useRemoveUserLibraryMutation
} = bookApi;