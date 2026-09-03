import {
  authCheckStarted,
  authCredentialsReceived,
  authSessionCleared,
} from "@/features/auth/store/auth-slice";
import { api } from "@/services/api";
import type {
  ApiMessageResponseI,
  AuthResponseI,
  LoginRequestI,
  RegisterRequestI,
} from "@/types/auth";

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponseI, LoginRequestI>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(_credentials, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(authCredentialsReceived(data));
        } catch {
          dispatch(authSessionCleared());
        }
      },
      invalidatesTags: ["User"],
    }),
    register: builder.mutation<AuthResponseI, RegisterRequestI>({
      query: (credentials) => ({
        url: "/auth/register",
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(_credentials, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(authCredentialsReceived(data));
        } catch {
          dispatch(authSessionCleared());
        }
      },
      invalidatesTags: ["User"],
    }),
    refreshSession: builder.mutation<AuthResponseI, void>({
      query: () => ({
        url: "/auth/refresh",
        method: "POST",
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        dispatch(authCheckStarted());

        try {
          const { data } = await queryFulfilled;
          dispatch(authCredentialsReceived(data));
        } catch {
          dispatch(authSessionCleared());
        }
      },
      invalidatesTags: ["User"],
    }),
    logout: builder.mutation<ApiMessageResponseI, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } finally {
          dispatch(authSessionCleared());
          dispatch(api.util.resetApiState());
        }
      },
      invalidatesTags: ["User", "Job", "Application", "CandidateProfile"],
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRefreshSessionMutation,
  useRegisterMutation,
} = authApi;
