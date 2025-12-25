import { configureStore } from "@reduxjs/toolkit";
import { bookApi } from "../Api/bookApi";
import { authApi } from "../Api/authApi";
import authReducer from "./authSlice";
export const store = configureStore({
    reducer: {
        [bookApi.reducerPath]: bookApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(bookApi.middleware).concat(authApi.middleware)



})