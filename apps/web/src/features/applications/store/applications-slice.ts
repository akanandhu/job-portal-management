import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootStateI } from "@/app/store";
import type { ApplicationStatusI } from "@job-portal/contracts/applications";
import type { ApplicationDataI, ApplicationsStateI } from "@/types/applications";

const initialState: ApplicationsStateI = {
  myApplications: [],
  allApplications: [],
};

const applicationsSlice = createSlice({
  name: "applications",
  initialState,
  reducers: {
    myApplicationsReceived(state, action: PayloadAction<ApplicationDataI[]>) {
      state.myApplications = action.payload;
    },
    allApplicationsReceived(state, action: PayloadAction<ApplicationDataI[]>) {
      state.allApplications = action.payload;
    },
    applicationCreated(state, action: PayloadAction<ApplicationDataI>) {
      const exists = state.myApplications.some(
        (app) => app.id === action.payload.id || app.jobId === action.payload.jobId,
      );

      if (!exists) {
        state.myApplications.unshift(action.payload);
      }
    },
    applicationStatusUpdated(
      state,
      action: PayloadAction<{ id: string; status: ApplicationStatusI }>,
    ) {
      const myApp = state.myApplications.find((app) => app.id === action.payload.id);

      if (myApp) {
        myApp.status = action.payload.status;
      }
      const allApp = state.allApplications.find((app) => app.id === action.payload.id);

      if (allApp) {
        allApp.status = action.payload.status;
      }
    },
  },
});

export const {
  allApplicationsReceived,
  applicationCreated,
  applicationStatusUpdated,
  myApplicationsReceived,
} = applicationsSlice.actions;

export const applicationsReducer = applicationsSlice.reducer;

export const selectMyApplications = (state: RootStateI) => state.applications.myApplications;
export const selectAllApplications = (state: RootStateI) => state.applications.allApplications;
export const selectHasAppliedToJob = (state: RootStateI, jobId?: string) =>
  Boolean(jobId && state.applications.myApplications.some((app) => app.jobId === jobId));
