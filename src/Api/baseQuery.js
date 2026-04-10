import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout } from "../Redux/authSlice";

const createCustomBaseQuery = (baseUrl) => {
  const baseQuery = fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  });

  return async (args, api, extraOptions) => {
    const result = await baseQuery(args, api, extraOptions);

    // Handle 401 Unauthorized error
    if (result.error && result.error.status === 401) {
      // Dispatch logout action to clear auth state
      api.dispatch(logout());
      
      // Redirect to login page
      window.location.href = "/login";
    }

    return result;
  };
};

export default createCustomBaseQuery;
