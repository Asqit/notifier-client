import type { RootState } from "./store";
import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 12_0000,
  prepareHeaders(headers, { getState }) {
    const token = (getState() as RootState)?.auth?.access_token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

export const baseApi = createApi({
  endpoints: () => ({}),
  tagTypes: ["User", "Nudge", "Notification"],
  keepUnusedDataFor: 60,
  baseQuery,
});
