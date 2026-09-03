import { useState } from "react";
import toast from "react-hot-toast";

import { useAppSelector } from "@/app/hook";
import {
  useApplyToJobMutation,
  useListJobApplicationsQuery,
  useListMyApplicationsQuery,
} from "@/features/applications/store/applications-api";
import {
  selectAllApplications,
  selectHasAppliedToJob,
} from "@/features/applications/store/applications-slice";
import { formatApplications } from "@/features/applications/utils/format-application";
import { selectIsAdmin, selectIsCandidate } from "@/features/auth/store/auth-selectors";
import type { AdminApplicationI, AdminJobI } from "@/features/dashboard/data/dashboard-data";
import { useGetJobQuery } from "@/features/jobs/store/jobs-api";
import { selectJobs } from "@/features/jobs/store/jobs-slice";
import { getApiErrorMessage } from "@/services/api-error";
import type { JobResponseDataI } from "@/types/jobs";

const defaultApplicationsPerPage = 20;

type UseJobDetailOptionsI = {
  applications?: AdminApplicationI[];
  applicationsPerPage?: number;
  jobId?: string;
};

function formatJobData(jobData: JobResponseDataI): AdminJobI {
  return {
    id: jobData.id,
    title: jobData.title,
    description: jobData.description,
    company: jobData.company,
    location: jobData.location,
    workplaceType: jobData.workplaceType,
    category: jobData.category,
    experienceLevel: jobData.experienceLevel,
    skills: jobData.skills ?? [],
    status: jobData.status,
    isFeatured: jobData.isFeatured,
    applicationsCount: jobData.applicationsCount ?? 0,
    logo: jobData.company ? jobData.company.slice(0, 2).toUpperCase() : "JB",
    postedAt: "Recently",
  };
}

export function useJobDetail({
  applications: providedApplications,
  applicationsPerPage = defaultApplicationsPerPage,
  jobId,
}: UseJobDetailOptionsI = {}) {
  const [page, setPage] = useState(1);
  const jobs = useAppSelector(selectJobs);
  const isCandidate = useAppSelector(selectIsCandidate);
  const isAdmin = useAppSelector(selectIsAdmin);

  const { data: jobApiData, isLoading: isLoadingJob } = useGetJobQuery(jobId ?? "", {
    skip: !jobId,
  });

  useListMyApplicationsQuery(undefined, {
    skip: !jobId || !isCandidate,
  });

  const { data: jobAppsApiData, isLoading: isLoadingJobApps } = useListJobApplicationsQuery(
    jobId ?? "",
    {
      skip: !jobId || !isAdmin,
    },
  );

  const allApplications = useAppSelector(selectAllApplications);
  const hasApplied = useAppSelector((state) => selectHasAppliedToJob(state, jobId));

  const [applyToJob, { isLoading: isApplying }] = useApplyToJobMutation();

  const fetchedJob = jobApiData?.data ? formatJobData(jobApiData.data) : undefined;
  const localJob = jobId ? jobs.find((j) => j.id === jobId) : undefined;
  const job: AdminJobI | undefined = fetchedJob ?? localJob;

  const apiJobAppsFormatted = jobAppsApiData?.data
    ? formatApplications(jobAppsApiData.data)
    : undefined;

  const jobApplications: AdminApplicationI[] = providedApplications
    ? providedApplications
    : apiJobAppsFormatted
      ? apiJobAppsFormatted
      : jobId
        ? formatApplications(allApplications.filter((app) => app.jobId === jobId))
        : [];

  const totalPages = Math.max(1, Math.ceil(jobApplications.length / applicationsPerPage));
  const visibleApplications = jobApplications.slice(
    (page - 1) * applicationsPerPage,
    page * applicationsPerPage,
  );

  const handleApply = async (targetJobId?: string) => {
    const idToApply = targetJobId ?? jobId;
    if (!idToApply) return;

    try {
      const response = await applyToJob({ jobId: idToApply }).unwrap();
      toast.success(response.message || "Application submitted successfully!");
    } catch (error: unknown) {
      const message = getApiErrorMessage(error, "Failed to submit application");
      toast.error(message);
    }
  };

  return {
    applications: jobApplications,
    applicationsPerPage,
    handleApply,
    hasApplied,
    isApplying,
    isLoadingJob,
    isLoadingJobApps,
    job,
    page,
    setPage,
    totalPages,
    visibleApplications,
  };
}

export default useJobDetail;
