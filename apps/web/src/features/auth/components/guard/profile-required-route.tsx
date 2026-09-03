import type { ReactNode } from "react";
import { Navigate } from "react-router";

import { useGetCandidateProfileQuery } from "@/features/profile/store/profile-api";

type ProfileRequiredRoutePropsI = {
  children: ReactNode;
};

export function ProfileRequiredRoute({ children }: ProfileRequiredRoutePropsI) {
  const { data, isFetching, isLoading } = useGetCandidateProfileQuery();

  if (isLoading || isFetching) {
    return null;
  }

  if (!data?.data) {
    return <Navigate to="/profile" replace />;
  }

  return children;
}
