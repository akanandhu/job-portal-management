import { api } from "@/services/api";
import type { CreateJobInputI, JobStatusI, UpdateJobInputI } from "@job-portal/contracts/jobs";
import type { JobResponseDataI } from "@/types/jobs";
import { jobCreated, jobEdited, jobsReceived } from "./jobs-slice";

type JobsListResponseMetaI = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

type JobsListApiResponseI = {
  data: JobResponseDataI[];
  meta: JobsListResponseMetaI;
};

type ListJobsQueryI = {
  status?: JobStatusI | "all";
};

type JobResponseI = {
  data: JobResponseDataI;
};

type UpdateJobRequestI = {
  id: string;
  data: UpdateJobInputI;
};

export const jobsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    listJobs: builder.query<JobsListApiResponseI, ListJobsQueryI | void>({
      query: (query) => ({
        url: "/jobs",
        method: "GET",
        params: query ?? undefined,
      }),
      async onQueryStarted(_query, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(jobsReceived(data.data));
        } catch {
          return;
        }
      },
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

export const { useCreateJobMutation, useListJobsQuery, useUpdateJobMutation } = jobsApi;
