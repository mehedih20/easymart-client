import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://easy-mart-server-sandy.vercel.app",
  // prepareHeaders: (headers, { getState }) => {
  //   const token = (getState()).auth.token;

  //   if (token) {
  //     headers.set("authorization", token);
  //   }

  //   return headers;
  // },
});

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery,
  tagTypes: ["products", "users", "orders", "cart"],
  endpoints: () => ({}),
});