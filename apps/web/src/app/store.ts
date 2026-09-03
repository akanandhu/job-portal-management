import { configureStore } from "@reduxjs/toolkit";

import { applicationsReducer } from "@/features/applications/store/applications-slice";
import { authReducer } from "@/features/auth/store/auth-slice";
import { jobsReducer } from "@/features/jobs/store/jobs-slice";
import { api } from "@/services/api";

export const store = configureStore({
  reducer: {
    applications: applicationsReducer,
    auth: authReducer,
    jobs: jobsReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
});

export type AppStoreI = typeof store;
export type RootStateI = ReturnType<AppStoreI["getState"]>;
export type AppDispatchI = AppStoreI["dispatch"];
