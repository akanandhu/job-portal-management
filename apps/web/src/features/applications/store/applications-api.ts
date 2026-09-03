import { api } from "@/services/api";
import type { ApplicationStatusI } from "@job-portal/contracts/applications";
import {
  allApplicationsReceived,
  applicationCreated,
  applicationStatusUpdated,
  myApplicationsReceived,
} from "./applications-slice";
import type { ApplicationDataI } from "@/types/applications";

type ApplyToJobRequestI = {
  jobId: string;
};

type ApplyToJobResponseI = {
  message: string;
  data: ApplicationDataI;
};

type MyApplicationsResponseI = {
  data: ApplicationDataI[];
};

type UpdateApplicationStatusRequestI = {
  id: string;
  status: ApplicationStatusI;
};

type ListMyApplicationsQueryRequestI = {
  status?: string;
  yearsOfExperience?: string;
  search?: string;
};

type ListAllApplicationsQueryRequestI = {
  page?: number;
  limit?: number;
  status?: string;
  yearsOfExperience?: string;
  search?: string;
};

type ListAllApplicationsApiResponseI = {
  data: ApplicationDataI[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

export const applicationsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    applyToJob: builder.mutation<ApplyToJobResponseI, ApplyToJobRequestI>({
      query: ({ jobId }) => ({
        url: `/jobs/${jobId}/apply`,
        method: "POST",
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(applicationCreated(data.data));
        } catch {
          return;
        }
      },
      invalidatesTags: ["Application", "Job"],
    }),
    listMyApplications: builder.query<
      MyApplicationsResponseI,
      ListMyApplicationsQueryRequestI | void
    >({
      query: (query) => ({
        url: "/applications/me",
        method: "GET",
        params: query ?? undefined,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(myApplicationsReceived(data.data));
        } catch {
          return;
        }
      },
      providesTags: ["Application"],
    }),
    listAllApplications: builder.query<
      ListAllApplicationsApiResponseI,
      ListAllApplicationsQueryRequestI | void
    >({
      query: (query) => ({
        url: "/applications/all",
        method: "GET",
        params: query ?? undefined,
      }),
      async onQueryStarted(query, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(allApplicationsReceived({ items: data.data, page: query?.page }));
        } catch {
          return;
        }
      },
      providesTags: ["Application"],
    }),
    listJobApplications: builder.query<{ data: ApplicationDataI[] }, string>({
      query: (jobId) => ({
        url: `/jobs/${jobId}/applications`,
        method: "GET",
      }),
      providesTags: ["Application"],
    }),
    updateApplicationStatus: builder.mutation<
      { data: ApplicationDataI },
      UpdateApplicationStatusRequestI
    >({
      query: ({ id, status }) => ({
        url: `/applications/${id}/status`,
        method: "PATCH",
        body: { status },
      }),
      async onQueryStarted({ id, status }, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(applicationStatusUpdated({ id, status }));
        } catch {
          return;
        }
      },
      invalidatesTags: ["Application"],
    }),
  }),
});

export const {
  useApplyToJobMutation,
  useListAllApplicationsQuery,
  useListJobApplicationsQuery,
  useListMyApplicationsQuery,
  useUpdateApplicationStatusMutation,
} = applicationsApi;
