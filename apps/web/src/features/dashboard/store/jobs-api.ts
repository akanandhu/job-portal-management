import { api } from "@/services/api";
import type { CreateJobInputI } from "@job-portal/contracts/jobs";
import type { JobResponseDataI } from "@/types/jobs";

type JobResponseI = {
  data: JobResponseDataI;
};

export const jobsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createJob: builder.mutation<JobResponseI, CreateJobInputI>({
      query: (job) => ({
        url: "/jobs",
        method: "POST",
        body: job,
      }),
      invalidatesTags: ["Job"],
    }),
  }),
});

export const { useCreateJobMutation } = jobsApi;
