import { configureStore } from "@reduxjs/toolkit";
import {bookApi} from "../Api/bookApi";
export const store = configureStore({
    reducer : {
        [bookApi.reducerPath] : bookApi.reducer,
       
    },
    middleware : (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(bookApi.middleware)
    
    
    
})