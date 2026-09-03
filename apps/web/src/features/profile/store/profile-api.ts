import type { CandidateProfileInputI } from "@job-portal/contracts";

import { api } from "@/services/api";
import type { CandidateProfileResponseI } from "@/types/profile";

export const profileApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCandidateProfile: builder.query<CandidateProfileResponseI, void>({
      query: () => "/profile",
      providesTags: ["CandidateProfile"],
    }),
    saveCandidateProfile: builder.mutation<CandidateProfileResponseI, CandidateProfileInputI>({
      query: (profile) => ({
        url: "/profile",
        method: "PUT",
        body: profile,
      }),
      invalidatesTags: ["CandidateProfile"],
    }),
  }),
});

export const { useGetCandidateProfileQuery, useSaveCandidateProfileMutation } = profileApi;
