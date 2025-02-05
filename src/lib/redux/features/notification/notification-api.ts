import type { PaginateResponse } from "@/types";
import type { Notification } from "./notification-types";
import { baseApi } from "../../baseApi";

const BASE_URL = "/notification";

const notificationApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // ------------------------------------- GET UNREAD
    getNotifications: build.query<PaginateResponse<Notification>, void>({
      query: () => ({
        url: `${BASE_URL}/`,
        method: "GET",
      }),
      providesTags: (res, _err, _arg) =>
        res
          ? res.items.map((item) => ({ type: "Notification", id: item.id }))
          : [{ type: "Notification" }],
    }),
    // ------------------------------------- MARK AS READ
    readNotification: build.mutation<Notification, number>({
      query: (id) => ({
        url: `${BASE_URL}/${id}`,
        method: "PUT",
      }),
      invalidatesTags: (res, _err, _args) => [
        { type: "Notification", id: res?.id },
      ],
    }),
  }),
});

export const { useGetNotificationsQuery, useReadNotificationMutation } =
  notificationApi;
