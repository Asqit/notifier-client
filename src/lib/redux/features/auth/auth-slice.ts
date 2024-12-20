import type { AuthState } from "./auth-types";
import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "./auth-api";

const initialState: Partial<AuthState> = {};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addMatcher(
        authApi.endpoints.login.matchFulfilled,
        (_state, { payload }) => {
          return payload;
        }
      )
      .addMatcher(
        authApi.endpoints.register.matchFulfilled,
        (_state, { payload }) => {
          return payload;
        }
      );
  },
});
