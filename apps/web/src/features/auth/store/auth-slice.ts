import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { AuthResponseI, AuthStateI, AuthUserI } from "@/types/auth";

const initialState: AuthStateI = {
  accessToken: null,
  user: null,
  status: "idle",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authCheckStarted(state) {
      state.status = "checking";
    },
    authCredentialsReceived(state, action: PayloadAction<AuthResponseI>) {
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
      state.status = "authenticated";
    },
    authUserUpdated(state, action: PayloadAction<AuthUserI>) {
      state.user = action.payload;
    },
    authSessionCleared(state) {
      state.accessToken = null;
      state.user = null;
      state.status = "anonymous";
    },
  },
});

export const { authCheckStarted, authCredentialsReceived, authSessionCleared, authUserUpdated } =
  authSlice.actions;

export const authReducer = authSlice.reducer;
