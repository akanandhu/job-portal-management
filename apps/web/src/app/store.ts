import { configureStore } from "@reduxjs/toolkit";

import { authReducer } from "@/features/auth/store/auth-slice";
import { api } from "@/services/api";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
});

export type AppStoreI = typeof store;
export type RootStateI = ReturnType<AppStoreI["getState"]>;
export type AppDispatchI = AppStoreI["dispatch"];
