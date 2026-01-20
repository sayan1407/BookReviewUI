import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const bookApi = createApi({
  reducerPath: "apiBook",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://bookreviewapi-h6evcnhwa3g8dpca.centralus-01.azurewebsites.net/api/Book",
    prepareHeaders: (headers, {
      getState
    }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
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
    })

  }),
});
export const { useGetBooksMutation, useSearchBooksMutation, useGetSearchOptionsQuery, useGetBookByIdQuery, useGetReviewForUserQuery,
  useUpdateReviewForUserMutation, useGetReviewsByBookIdQuery, useGetRecommendedBooksQuery
} = bookApi;