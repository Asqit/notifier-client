import { baseApi } from "../../baseApi";
import { AuthState, RegisterPayload } from "./auth-types";
import type { User } from "../users/users-type";

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // --------------------------------------------------------------- LOGIN
    getMe: build.query<User, void>({
      query: () => ({
        url: "auth/me",
        method: "GET",
      }),
      providesTags: (_res, _meta, _args) => [
        { type: "User", id: "currentUser" },
      ],
    }),
    // --------------------------------------------------------------- LOGIN
    login: build.mutation<AuthState, FormData>({
      query: (credentials) => ({
        url: "auth/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: (res, _meta, _args) =>
        res ? [{ type: "User", id: "currentUser" }] : [],
    }),
    // --------------------------------------------------------------- REGISTER
    register: build.mutation<AuthState, RegisterPayload>({
      query: (payload) => ({
        url: "auth/register",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: (res, _meta, _args) =>
        res ? [{ type: "User", id: "currentUser" }] : [],
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useGetMeQuery } = authApi;
