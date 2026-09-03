import { useState } from "react";
import toast from "react-hot-toast";

import { useAppSelector } from "@/app/hook";
import { useApplyToJobMutation } from "@/features/applications/store/applications-api";
import {
  selectAllApplications,
  selectHasAppliedToJob,
} from "@/features/applications/store/applications-slice";
import { formatApplications } from "@/features/applications/utils/format-application";
import type { AdminApplicationI, AdminJobI } from "@/features/dashboard/data/dashboard-data";
import { selectJobs } from "@/features/jobs/store/jobs-slice";
import { getApiErrorMessage } from "@/services/api-error";

const defaultApplicationsPerPage = 10;

type UseJobDetailOptionsI = {
  applications?: AdminApplicationI[];
  applicationsPerPage?: number;
  jobId?: string;
};

export function useJobDetail({
  applications: providedApplications,
  applicationsPerPage = defaultApplicationsPerPage,
  jobId,
}: UseJobDetailOptionsI = {}) {
  const [page, setPage] = useState(1);
  const jobs = useAppSelector(selectJobs);
  const allApplications = useAppSelector(selectAllApplications);
  const hasApplied = useAppSelector((state) => selectHasAppliedToJob(state, jobId));

  const [applyToJob, { isLoading: isApplying }] = useApplyToJobMutation();

  const job: AdminJobI | undefined = jobId ? jobs.find((j) => j.id === jobId) : undefined;

  const jobApplications: AdminApplicationI[] = providedApplications
    ? providedApplications
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
    job,
    page,
    setPage,
    totalPages,
    visibleApplications,
  };
}

export default useJobDetail;
