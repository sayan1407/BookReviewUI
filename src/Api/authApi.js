import { createApi } from "@reduxjs/toolkit/query/react";
import createCustomBaseQuery from "./baseQuery";

export const authApi = createApi({
    reducerPath: "apiAuth",
    baseQuery: createCustomBaseQuery("https://bookreviewservice-hzhvcyghehf2hhcu.canadacentral-01.azurewebsites.net/api/Auth"),
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

        googleLogin: builder.mutation({
            query: ({ jwttoken }) => ({
                url: "googleLogin",
                method: "POST",
                body: {
                    idToken: jwttoken,
                }
            }),
        }),


    }),
});
export const { useRegisterMutation, useLoginMutation, useGoogleLoginMutation } = authApi;