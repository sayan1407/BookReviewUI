import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const bookApi = createApi({
  reducerPath: "apiBook",
  baseQuery: fetchBaseQuery({ baseUrl: "https://localhost:7150/api/Book" }),
  tagTypes : ["Books"],
  endpoints: (builder) => ({
    //QUERY -> GET
    //MUTATION -> POST/PUT/DELETE
    getBooks: builder.query({
      query: ({pageindex,pagesize}) => ({
        url : "books",
        method : "GET",
        params : {
            pageindex : pageindex,
            pagesize : pagesize,

        }
      }),
      
      providesTags : ["Books"]
    }),
    searchBooks : builder.mutation({
      query: (searchData) => ({
        url : "books/search",
        method : "POST",
        body : searchData
      }) ,
    }),
    
    
  }),
});
export const { useGetBooksQuery, useSearchBooksMutation
 } = bookApi;