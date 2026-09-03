import { useState } from "react";
import { useSearchParams } from "react-router";

import { useAppDispatch, useAppSelector } from "@/app/hook";
import { useListJobsQuery } from "@/features/jobs/store/jobs-api";
import type { AdminJobI } from "@/features/dashboard/data/dashboard-data";
import {
  clearFilters as clearFiltersAction,
  selectJobFilters,
  selectJobs,
  toJobListItem,
} from "@/features/jobs/store/jobs-slice";
import { getApiErrorMessage } from "@/services/api-error";
import type { JobResponseDataI, ListJobsQueryI } from "@/types/jobs";
import type {
  ExperienceLevelI,
  JobCategoryI,
  JobStatusI,
  WorkplaceTypeI,
} from "@job-portal/contracts/jobs";

type UseJobListOptionsI = {
  status?: JobStatusI | "all";
};

export function useJobList(options: UseJobListOptionsI = {}) {
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const reduxFilters = useAppSelector(selectJobFilters);

  const rawCategory = searchParams.get("category") ?? reduxFilters.category;
  const rawExperience = searchParams.get("experienceLevel") ?? reduxFilters.experienceLevel;
  const rawWorkplace = searchParams.get("workplaceType") ?? reduxFilters.workplaceType;
  const statusParam = searchParams.get("status") as JobStatusI | "all" | null;

  const category = rawCategory && rawCategory !== "all" ? (rawCategory as JobCategoryI) : undefined;
  const experienceLevel =
    rawExperience && rawExperience !== "all" ? (rawExperience as ExperienceLevelI) : undefined;
  const workplaceType =
    rawWorkplace && rawWorkplace !== "all" ? (rawWorkplace as WorkplaceTypeI) : undefined;
  const status = (statusParam ?? reduxFilters.status ?? options.status) as
    JobStatusI | "all" | undefined;

  const filterKey = `${category ?? ""}-${experienceLevel ?? ""}-${workplaceType ?? ""}-${status ?? ""}`;
  const [prevFilterKey, setPrevFilterKey] = useState(filterKey);
  const [accumulatedJobs, setAccumulatedJobs] = useState<AdminJobI[]>([]);
  const [prevData, setPrevData] = useState<JobResponseDataI[] | undefined>(undefined);

  if (prevFilterKey !== filterKey) {
    setPrevFilterKey(filterKey);
    setPage(1);
    setAccumulatedJobs([]);
    setPrevData(undefined);
  }

  const queryParams: ListJobsQueryI = {
    page,
    ...(status ? { status } : {}),
    ...(category ? { category } : {}),
    ...(experienceLevel ? { experienceLevel } : {}),
    ...(workplaceType ? { workplaceType } : {}),
  };

  const {
    data: jobsResponse,
    error: jobsError,
    isLoading,
    isFetching,
    refetch,
  } = useListJobsQuery(queryParams);

  if (jobsResponse?.data && jobsResponse.data !== prevData) {
    setPrevData(jobsResponse.data);
    const newItems = jobsResponse.data.map(toJobListItem);
    if (page === 1) {
      setAccumulatedJobs(newItems);
    } else {
      setAccumulatedJobs((prev) => {
        const combined = [...prev];
        newItems.forEach((item) => {
          if (!combined.some((j) => j.id === item.id)) {
            combined.push(item);
          }
        });
        return combined;
      });
    }
  }

  const reduxJobs = useAppSelector(selectJobs);
  const jobs =
    accumulatedJobs.length > 0
      ? accumulatedJobs
      : jobsResponse?.data
        ? jobsResponse.data.map(toJobListItem)
        : reduxJobs;

  const jobsMeta = jobsResponse?.meta;
  const hasMore = Boolean(jobsMeta && jobsMeta.page < jobsMeta.totalPages);
  const hasActiveFilters = Boolean(
    category || experienceLevel || workplaceType || (statusParam && statusParam !== "all"),
  );

  const handleLoadMore = () => {
    if (hasMore && !isFetching) {
      setPage((prev: number) => prev + 1);
    }
  };

  const handleClearFilters = () => {
    dispatch(clearFiltersAction());
    const nextParams = new URLSearchParams(searchParams);
    nextParams.delete("category");
    nextParams.delete("experienceLevel");
    nextParams.delete("workplaceType");
    nextParams.delete("status");
    nextParams.delete("applicationExperience");
    setSearchParams(nextParams);
  };

  return {
    errorMessage: jobsError ? getApiErrorMessage(jobsError, "Failed to load jobs") : undefined,
    hasActiveFilters,
    hasMore,
    isError: Boolean(jobsError),
    isFetchingMore: isFetching,
    isLoading,
    jobs,
    onClearFilters: handleClearFilters,
    onLoadMore: handleLoadMore,
    onRetry: () => {
      refetch();
    },
  };
}
