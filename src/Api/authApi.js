import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const authApi = createApi({
    reducerPath: "apiAuth",
    baseQuery: fetchBaseQuery({ baseUrl: "http://sayanksaha7-001-site1.anytempurl.com/api/Auth" }),
    tagTypes: ["Auth"],
    endpoints: (builder) => ({
        //QUERY -> GET
        //MUTATION -> POST/PUT/DELETE
        register: builder.mutation({
            query: ({ email, password }) => ({
                url: "register",
                method: "POST",
                body: {
                    email: email,
                    userName: email,
                    password: password,
                }
            }),

        }),
        login: builder.mutation({
            query: ({ email, password }) => ({
                url: "login",
                method: "POST",
                body: {
                    userName: email,
                    password: password,
                }
            }),
        }),


    }),
});
export const { useRegisterMutation, useLoginMutation } = authApi;