import type { Nudge, CreateNudge } from "./nudges-types";
import { baseApi } from "../../baseApi";

function url(path: string): string {
  if (path[0] === "/") {
    return `/nudges${path}`;
  }

  return `/nudges/${path}`;
}

const nudgesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // --------------------------------------------------------------- CREATE NUDGE
    createdNudge: build.mutation<Nudge, CreateNudge>({
      query: (payload) => ({
        url: url("/"),
        body: payload,
        method: "POST",
      }),
      invalidatesTags: (res, _err, _arg) =>
        res ? [{ type: "Notification", id: res.id }] : [{ type: "Nudge" }],
    }),
    // --------------------------------------------------------------- GET RECEIVED NUDGE
    getReceivedNudges: build.query<Nudge[], void>({
      query: () => ({
        url: url("/received"),
      }),
      providesTags: (res, _err, _arg) =>
        res
          ? [{ type: "Notification", id: res.id }]
          : [{ type: "Notification" }],
    }),
    // --------------------------------------------------------------- GET SENT NUDGE
    getSentNudges: build.query<Nudge[], void>({
      query: () => ({
        url: url("/sent"),
      }),
      providesTags: (res, _err, _arg) =>
        res
          ? [{ type: "Notification", id: res.id }]
          : [{ type: "Notification" }],
    }),
  }),
});

export const {
  useCreatedNudgeMutation,
  useGetReceivedNudgesQuery,
  useGetSentNudgesQuery,
} = nudgesApi;
