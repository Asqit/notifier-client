import { baseApi } from "../../baseApi";
import { User } from "./users-type";

const usersApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // --------------------------------------------------------------- GET USER
    getUser: build.query<User, number>({
      query: (userId) => ({
        url: `/friends/${userId}`,
      }),
    }),
    // --------------------------------------------------------------- GET FRIENDS
    getFriends: build.query<User[], void>({
      query: () => ({
        url: "/friends",
      }),
    }),
    // --------------------------------------------------------------- REQUEST FRIENDSHIP
    requestFriendship: build.mutation<void, number>({
      query: (userId) => ({
        url: `/friends/request/${userId}`,
        method: "POST",
      }),
    }),
    // --------------------------------------------------------------- ACCEPT FRIENDSHIP
    acceptFriendship: build.mutation<void, number>({
      query: (userId) => ({
        url: `/friends/accept/${userId}`,
        method: "POST",
      }),
    }),
    // --------------------------------------------------------------- REJECT FRIENDSHIP
    rejectFriendship: build.mutation<void, number>({
      query: (userId) => ({
        url: `/friends/request/${userId}`,
        method: "DELETE",
      }),
    }),
    // --------------------------------------------------------------- SEARCH USER
    searchUser: build.query<User[], string>({
      query: (username) => ({
        url: `/friends/search/${username}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useLazySearchUserQuery,
  useSearchUserQuery,
  useGetFriendsQuery,
  useRequestFriendshipMutation,
  useAcceptFriendshipMutation,
  useRejectFriendshipMutation,
  useGetUserQuery,
} = usersApi;
