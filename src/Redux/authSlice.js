import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

const initialState = {
    user: (() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decoded = jwtDecode(token);
                return decoded.name; // Storing email as the user identifier 
            } catch (e) {
                return null;
            }
        }
        return null;
    })(),
    userId: (() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decoded = jwtDecode(token);
                return decoded.id; // Storing email as the user identifier 
            } catch (e) {
                return null;
            }
        }
        return null;
    })(),
    token: localStorage.getItem("token") || null,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.token = action.payload;
            try {
                const decoded = jwtDecode(action.payload);
                state.user = decoded.email;
                state.userId = decoded.id;
                localStorage.setItem("token", action.payload);
            } catch (e) {
                state.user = null;
                state.token = null;
            }
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            localStorage.removeItem("token");
        }
    }
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
