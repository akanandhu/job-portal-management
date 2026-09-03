import {
  createApi,
  fetchBaseQuery,
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";

import type { RootStateI } from "@/app/store";
import { authCredentialsReceived, authSessionCleared } from "@/features/auth/store/auth-slice";

import type { AuthResponseI } from "@/types/auth";

const rawBaseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,
  credentials: "include",

  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootStateI).auth.accessToken;

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

const getRequestUrl = (args: string | FetchArgs) => (typeof args === "string" ? args : args.url);

const authPathsWithoutRefresh = new Set(["/auth/login", "/auth/refresh", "/auth/logout"]);

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions,
) => {
  let result = await rawBaseQuery(args, api, extraOptions);

  if (result.error?.status === 401 && !authPathsWithoutRefresh.has(getRequestUrl(args))) {
    const refreshResult = await rawBaseQuery(
      {
        url: "/auth/refresh",
        method: "POST",
      },
      api,
      extraOptions,
    );

    if (refreshResult.data) {
      const data = refreshResult.data as AuthResponseI;

      api.dispatch(authCredentialsReceived(data));

      result = await rawBaseQuery(args, api, extraOptions);
    } else {
      api.dispatch(authSessionCleared());
    }
  }

  return result;
};

export const api = createApi({
  reducerPath: "api",

  baseQuery: baseQueryWithReauth,

  tagTypes: ["User", "Job", "Application", "CandidateProfile"],

  endpoints: () => ({}),
});
