import { useState } from "react";

import { useAppSelector } from "@/app/hook";
import { useListJobsQuery } from "@/features/jobs/store/jobs-api";
import { selectJobs } from "@/features/jobs/store/jobs-slice";
import { getApiErrorMessage } from "@/services/api-error";
import type { JobStatusI } from "@job-portal/contracts/jobs";

type UseJobListOptionsI = {
  status?: JobStatusI | "all";
};

export function useJobList(options: UseJobListOptionsI = {}) {
  const [page, setPage] = useState(1);

  const {
    data: jobsResponse,
    error: jobsError,
    isLoading,
    isFetching,
  } = useListJobsQuery({
    page,
    status: options.status,
  });

  const jobs = useAppSelector(selectJobs);
  const jobsMeta = jobsResponse?.meta;
  const hasMore = Boolean(jobsMeta && jobsMeta.page < jobsMeta.totalPages);

  const handleLoadMore = () => {
    if (hasMore && !isFetching) {
      setPage((prev: number) => prev + 1);
    }
  };

  return {
    errorMessage: jobsError ? getApiErrorMessage(jobsError, "Failed to load jobs") : undefined,
    hasMore,
    isFetchingMore: isFetching,
    isLoading,
    jobs,
    onLoadMore: handleLoadMore,
  };
}
