import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { getNameInitial } from "@/lib/utils";
import type { RootStateI } from "@/app/store";
import type { AdminJobI } from "@/features/dashboard/data/dashboard-data";
import type { JobResponseDataI } from "@/types/jobs";

type JobsStateI = {
  items: AdminJobI[];
};

const initialState: JobsStateI = {
  items: [],
};

export const toJobListItem = (job: JobResponseDataI): AdminJobI => ({
  ...job,
  applicationsCount: "applicationsCount" in job ? Number(job.applicationsCount) : 0,
  logo: getNameInitial(job.company, "J"),
  postedAt: "createdAt" in job && job.createdAt ? "Today" : "Just now",
});

const upsertJob = (jobs: AdminJobI[], job: AdminJobI) => {
  const existingIndex = jobs.findIndex((item) => item.id === job.id);

  if (existingIndex === -1) {
    jobs.unshift(job);
    return;
  }

  jobs[existingIndex] = {
    ...jobs[existingIndex],
    ...job,
  };
};

const jobsSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    jobsReceived(state, action: PayloadAction<JobResponseDataI[]>) {
      state.items = action.payload.map(toJobListItem);
    },
    jobCreated(state, action: PayloadAction<JobResponseDataI>) {
      upsertJob(state.items, toJobListItem(action.payload));
    },
    jobEdited(state, action: PayloadAction<JobResponseDataI>) {
      upsertJob(state.items, toJobListItem(action.payload));
    },
  },
});

export const { jobCreated, jobEdited, jobsReceived } = jobsSlice.actions;
export const jobsReducer = jobsSlice.reducer;

export const selectJobs = (state: RootStateI) => state.jobs.items;
export const selectPublishedJobs = (state: RootStateI) =>
  state.jobs.items.filter((job) => job.status === "PUBLISHED");
