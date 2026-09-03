import type { ReactNode } from "react";
import { Navigate } from "react-router";

import { useGetCandidateProfileQuery } from "@/features/profile/store/profile-api";

type ProfileCompletionRoutePropsI = {
  children: ReactNode;
};

export function ProfileCompletionRoute({ children }: ProfileCompletionRoutePropsI) {
  const { data, isFetching, isLoading } = useGetCandidateProfileQuery();

  if (isLoading || isFetching) {
    return null;
  }

  if (data?.data) {
    return <Navigate to="/listing" replace />;
  }

  return children;
}
