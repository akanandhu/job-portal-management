import { api } from "@/services/api";
import type { CreateJobInputI } from "@job-portal/contracts/jobs";
import {
  categoriesReceived,
  featuredJobsReceived,
  jobCreated,
  jobEdited,
  jobsReceived,
} from "./jobs-slice";
import type {
  FeaturedJobsApiResponseI,
  FeaturedJobsQueryRequestI,
  JobCategoryCountResponseI,
  JobResponseI,
  JobsListApiResponseI,
  ListJobsQueryI,
  UpdateJobRequestI,
} from "@/types/jobs";

export const jobsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    listJobs: builder.query<JobsListApiResponseI, ListJobsQueryI | void>({
      query: (query) => ({
        url: "/jobs",
        method: "GET",
        params: query ?? undefined,
      }),
      async onQueryStarted(query, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(jobsReceived({ items: data.data, page: query?.page }));
        } catch {
          return;
        }
      },
      providesTags: ["Job"],
    }),
    listJobCategories: builder.query<JobCategoryCountResponseI, void>({
      query: () => ({
        url: "/jobs/categories",
        method: "GET",
      }),
      async onQueryStarted(_query, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(categoriesReceived(data.data));
        } catch {
          return;
        }
      },
      providesTags: ["Job"],
    }),
    listFeaturedJobs: builder.query<FeaturedJobsApiResponseI, FeaturedJobsQueryRequestI | void>({
      query: (query) => ({
        url: "/jobs/featured",
        method: "GET",
        params: query ?? undefined,
      }),
      async onQueryStarted(_query, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(featuredJobsReceived(data.data));
        } catch {
          return;
        }
      },
      providesTags: ["Job"],
    }),
    getJob: builder.query<JobResponseI, string>({
      query: (id) => ({
        url: `/jobs/${id}`,
        method: "GET",
      }),
      providesTags: ["Job"],
    }),
    createJob: builder.mutation<JobResponseI, CreateJobInputI>({
      query: (job) => ({
        url: "/jobs",
        method: "POST",
        body: job,
      }),
      async onQueryStarted(_job, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(jobCreated(data.data));
        } catch {
          return;
        }
      },
      invalidatesTags: ["Job"],
    }),
    updateJob: builder.mutation<JobResponseI, UpdateJobRequestI>({
      query: ({ id, data }) => ({
        url: `/jobs/${id}`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(_job, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(jobEdited(data.data));
        } catch {
          return;
        }
      },
      invalidatesTags: ["Job"],
    }),
  }),
});

export const {
  useCreateJobMutation,
  useGetJobQuery,
  useListFeaturedJobsQuery,
  useListJobCategoriesQuery,
  useListJobsQuery,
  useUpdateJobMutation,
} = jobsApi;
