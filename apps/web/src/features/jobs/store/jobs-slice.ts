import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { getNameInitial } from "@/lib/utils";
import type { RootStateI } from "@/app/store";
import type { AdminJobI } from "@/features/dashboard/data/dashboard-data";
import type { JobResponseDataI } from "@/types/jobs";

export type JobCategoryCountI = {
  category: string;
  count: number;
};

type JobsStateI = {
  items: AdminJobI[];
  featuredItems: AdminJobI[];
  categories: JobCategoryCountI[];
};

const initialState: JobsStateI = {
  items: [],
  featuredItems: [],
  categories: [],
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
    jobsReceived(
      state,
      action: PayloadAction<{ items: JobResponseDataI[]; page?: number } | JobResponseDataI[]>,
    ) {
      const payload = Array.isArray(action.payload)
        ? { items: action.payload, page: 1 }
        : action.payload;

      const newItems = payload.items.map(toJobListItem);

      if (payload.page && payload.page > 1) {
        newItems.forEach((job) => upsertJob(state.items, job));
      } else {
        state.items = newItems;
      }
    },
    featuredJobsReceived(state, action: PayloadAction<JobResponseDataI[]>) {
      state.featuredItems = action.payload.map(toJobListItem);
    },
    categoriesReceived(state, action: PayloadAction<JobCategoryCountI[]>) {
      state.categories = action.payload;
    },
    jobCreated(state, action: PayloadAction<JobResponseDataI>) {
      upsertJob(state.items, toJobListItem(action.payload));
    },
    jobEdited(state, action: PayloadAction<JobResponseDataI>) {
      upsertJob(state.items, toJobListItem(action.payload));
    },
  },
});

export const { categoriesReceived, featuredJobsReceived, jobCreated, jobEdited, jobsReceived } =
  jobsSlice.actions;
export const jobsReducer = jobsSlice.reducer;

export const selectJobs = (state: RootStateI) => state.jobs.items;
export const selectPublishedJobs = (state: RootStateI) =>
  state.jobs.items.filter((job) => job.status === "PUBLISHED");
export const selectFeaturedJobs = (state: RootStateI) => state.jobs.featuredItems;
export const selectJobCategories = (state: RootStateI) => state.jobs.categories;
