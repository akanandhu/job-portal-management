import type { RootStateI } from "@/app/store";

export const selectAuth = (state: RootStateI) => state.auth;
export const selectAccessToken = (state: RootStateI) => state.auth.accessToken;
export const selectCurrentUser = (state: RootStateI) => state.auth.user;
export const selectIsAuthenticated = (state: RootStateI) =>
  state.auth.status === "authenticated" && Boolean(state.auth.accessToken);
export const selectIsAdmin = (state: RootStateI) => state.auth.user?.role === "ADMIN";
export const selectIsCandidate = (state: RootStateI) => state.auth.user?.role === "USER";
