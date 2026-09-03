import { useState } from "react";
import { useSearchParams } from "react-router";

import { useAppDispatch, useAppSelector } from "@/app/hook";
import {
  useListAllApplicationsQuery,
  useListMyApplicationsQuery,
} from "@/features/applications/store/applications-api";
import {
  selectAllApplications,
  selectMyApplications,
} from "@/features/applications/store/applications-slice";
import { formatApplications } from "@/features/applications/utils/format-application";
import { selectCurrentUser, selectIsAdmin } from "@/features/auth/store/auth-selectors";
import {
  clearFilters as clearFiltersAction,
  selectJobFilters,
  selectJobs,
} from "@/features/jobs/store/jobs-slice";
import { getApiErrorMessage } from "@/services/api-error";
import type { ApplicationDataI } from "@/types/applications";

type UseApplicationListOptionsI = {
  status?: string;
  yearsOfExperience?: string;
  search?: string;
};

export function useApplicationList(options: UseApplicationListOptionsI = {}) {
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const isAdmin = useAppSelector(selectIsAdmin);
  const currentUser = useAppSelector(selectCurrentUser);
  const reduxFilters = useAppSelector(selectJobFilters);

  const statusParam = searchParams.get("tab") ?? searchParams.get("status") ?? options.status;
  const experienceParam =
    searchParams.get("applicationExperience") ??
    searchParams.get("yearsOfExperience") ??
    reduxFilters.applicationExperience ??
    options.yearsOfExperience;

  const status = statusParam && statusParam !== "all" ? statusParam : undefined;
  const yearsOfExperience =
    experienceParam && experienceParam !== "all" ? experienceParam : undefined;
  const search = options.search;

  const filterKey = `${status ?? ""}-${yearsOfExperience ?? ""}-${search ?? ""}`;
  const [prevFilterKey, setPrevFilterKey] = useState(filterKey);
  const [accumulatedApps, setAccumulatedApps] = useState<ApplicationDataI[]>([]);
  const [prevData, setPrevData] = useState<ApplicationDataI[] | undefined>(undefined);

  if (prevFilterKey !== filterKey) {
    setPrevFilterKey(filterKey);
    setPage(1);
    setAccumulatedApps([]);
    setPrevData(undefined);
  }

  const queryParams = {
    ...(status ? { status } : {}),
    ...(yearsOfExperience ? { yearsOfExperience } : {}),
    ...(search ? { search } : {}),
  };

  const adminQuery = useListAllApplicationsQuery({ page, ...queryParams }, { skip: !isAdmin });
  const userQuery = useListMyApplicationsQuery(queryParams, { skip: isAdmin });

  const activeData = isAdmin ? adminQuery.data?.data : userQuery.data?.data;

  if (activeData && activeData !== prevData) {
    setPrevData(activeData);
    if (page === 1) {
      setAccumulatedApps(activeData);
    } else {
      setAccumulatedApps((prev) => {
        const combined = [...prev];
        activeData.forEach((item) => {
          if (!combined.some((a) => a.id === item.id)) {
            combined.push(item);
          }
        });
        return combined;
      });
    }
  }

  const allApplications = useAppSelector(selectAllApplications);
  const myApplications = useAppSelector(selectMyApplications);

  const reduxRawApplications = isAdmin ? allApplications : myApplications;
  const rawApplications =
    accumulatedApps.length > 0 ? accumulatedApps : activeData ? activeData : reduxRawApplications;

  const applications = formatApplications(rawApplications, currentUser?.name ?? "Candidate");

  const meta = isAdmin ? adminQuery.data?.meta : undefined;
  const hasMore = Boolean(meta && meta.page < meta.totalPages);
  const isLoading = isAdmin ? adminQuery.isLoading : userQuery.isLoading;
  const isFetching = isAdmin ? adminQuery.isFetching : userQuery.isFetching;
  const error = isAdmin ? adminQuery.error : userQuery.error;
  const hasActiveFilters = Boolean(
    (statusParam && statusParam !== "all") ||
    (experienceParam && experienceParam !== "all") ||
    search,
  );

  const handleLoadMore = () => {
    if (hasMore && !isFetching) {
      setPage((prev: number) => prev + 1);
    }
  };

  const handleClearFilters = () => {
    dispatch(clearFiltersAction());
    const nextParams = new URLSearchParams(searchParams);
    nextParams.delete("applicationExperience");
    nextParams.delete("yearsOfExperience");
    nextParams.delete("tab");
    nextParams.delete("status");
    setSearchParams(nextParams);
  };

  const jobs = useAppSelector(selectJobs);

  return {
    applications,
    errorMessage: error ? getApiErrorMessage(error, "Failed to load applications") : undefined,
    hasActiveFilters,
    hasMore,
    isError: Boolean(error),
    isFetchingMore: isFetching,
    isLoading,
    jobs,
    onClearFilters: handleClearFilters,
    onLoadMore: handleLoadMore,
    onRetry: () => {
      if (isAdmin) {
        adminQuery.refetch();
      } else {
        userQuery.refetch();
      }
    },
  };
}
