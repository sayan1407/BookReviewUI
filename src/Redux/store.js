import { configureStore } from "@reduxjs/toolkit";
import { bookApi } from "../Api/bookApi";
import { authApi } from "../Api/authApi";
export const store = configureStore({
    reducer: {
        [bookApi.reducerPath]: bookApi.reducer,

    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(bookApi.middleware).concat(authApi.middleware)



})