import { useState } from "react";

import { useAppSelector } from "@/app/hook";
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
import { selectJobs } from "@/features/jobs/store/jobs-slice";
import { getApiErrorMessage } from "@/services/api-error";

type UseApplicationListOptionsI = {
  status?: string;
};

export function useApplicationList(options: UseApplicationListOptionsI = {}) {
  const [page, setPage] = useState(1);
  const isAdmin = useAppSelector(selectIsAdmin);
  const currentUser = useAppSelector(selectCurrentUser);

  const adminQuery = useListAllApplicationsQuery({ page }, { skip: !isAdmin });
  const userQuery = useListMyApplicationsQuery(undefined, { skip: isAdmin });

  const allApplications = useAppSelector(selectAllApplications);
  const myApplications = useAppSelector(selectMyApplications);

  const rawApplications = isAdmin ? allApplications : myApplications;

  let applications = formatApplications(rawApplications, currentUser?.name ?? "Candidate");

  if (options.status && options.status !== "all") {
    applications = applications.filter((app) => app.status === options.status);
  }

  const meta = isAdmin ? adminQuery.data?.meta : undefined;
  const hasMore = Boolean(meta && meta.page < meta.totalPages);
  const isLoading = isAdmin ? adminQuery.isLoading : userQuery.isLoading;
  const isFetching = isAdmin ? adminQuery.isFetching : userQuery.isFetching;
  const error = isAdmin ? adminQuery.error : userQuery.error;

  const handleLoadMore = () => {
    if (hasMore && !isFetching) {
      setPage((prev: number) => prev + 1);
    }
  };

  const jobs = useAppSelector(selectJobs);

  return {
    applications,
    errorMessage: error ? getApiErrorMessage(error, "Failed to load applications") : undefined,
    hasMore,
    isFetchingMore: isFetching,
    isLoading,
    jobs,
    onLoadMore: handleLoadMore,
  };
}
