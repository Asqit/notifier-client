import { baseApi } from "../../baseApi";
import type { User, UpdateUser } from "./users-type";

const BASE_URL = "/users";

const usersApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // --------------------------------------------------------------- UPDATE USER
    updateUser: build.mutation<User, UpdateUser>({
      query: (payload) => ({
        url: `${BASE_URL}/update`,
        body: payload,
        method: "PUT",
      }),
      invalidatesTags: (response, _error, _arguments) => [
        { type: "User", id: "currentUser" },
        { type: "User", id: response?.id },
      ],
    }),
    // --------------------------------------------------------------- GET USER
    getUser: build.query<User, number>({
      query: (userId) => ({
        url: `${BASE_URL}/${userId}`,
      }),
      providesTags: (_res, _err, id) => [{ type: "User", id }],
    }),
    // --------------------------------------------------------------- FOLLOW USER
    followUser: build.mutation<void, number>({
      query: (userId) => ({
        url: `${BASE_URL}/follow/${userId}`,
        method: "POST",
      }),
      invalidatesTags: (_res, _meta, id) => [
        { type: "User", id },
        { type: "User", id: "currentUser" },
      ],
    }),
    // --------------------------------------------------------------- UNFOLLOW USER
    unfollowUser: build.mutation<void, number>({
      query: (userId) => ({
        url: `${BASE_URL}/unfollow/${userId}`,
        method: "POST",
      }),
      invalidatesTags: (_res, _meta, id) => [
        { type: "User", id },
        { type: "User", id: "currentUser" },
      ],
    }),
    // --------------------------------------------------------------- SEARCH USER
    searchUser: build.query<User[], string>({
      query: (username) => ({
        url: `${BASE_URL}/search/${username}`,
        method: "GET",
      }),
      providesTags: (_res, _err, id) => [{ type: "User", id }],
    }),
    // --------------------------------------------------------------- GET FOLLOWERS
    getFollowers: build.query<User[], void>({
      query: () => ({
        url: `${BASE_URL}/followers`,
        method: "GET",
      }),
      providesTags: (res, _err, _id) =>
        res ? res.map((x) => ({ type: "User", id: x.id })) : [],
    }),
    // --------------------------------------------------------------- GET FOLLOWING
    getFollowing: build.query<User[], void>({
      query: () => ({
        url: `${BASE_URL}/following`,
        method: "GET",
      }),
      providesTags: (res, _err, _id) =>
        res ? res.map((x) => ({ type: "User", id: x.id })) : [],
    }),
  }),
});

export const {
  useGetFollowersQuery,
  useGetFollowingQuery,
  useLazySearchUserQuery,
  useSearchUserQuery,
  useFollowUserMutation,
  useUnfollowUserMutation,
  useGetUserQuery,
  useUpdateUserMutation,
  useLazyGetFollowersQuery,
  useLazyGetFollowingQuery,
  useLazyGetUserQuery,
} = usersApi;
