import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

const initialState = {
    currentPage: 1
};

export const pageSlice = createSlice({
    name: "page",
    initialState,
    reducers: {
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;

        },

    }
});

export const { setCurrentPage } = pageSlice.actions;
export default pageSlice.reducer;
