import { baseApi } from "../../baseApi";
import { AuthState, RegisterPayload } from "./auth-types";

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // --------------------------------------------------------------- LOGIN
    login: build.mutation<AuthState, FormData>({
      query: (credentials) => ({
        url: "auth/login",
        method: "POST",
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        body: new URLSearchParams(credentials as any).toString(),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }),
    }),
    // --------------------------------------------------------------- REGISTER
    register: build.mutation<AuthState, RegisterPayload>({
      query: (payload) => ({
        url: "auth/register",
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;
