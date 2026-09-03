import type { ReactNode } from "react";
import { Navigate } from "react-router";

import { useAppSelector } from "@/app/hook";
import { selectCurrentUser, selectIsAuthenticated } from "@/features/auth/store/auth-selectors";

type GuestRoutePropsI = {
  children: ReactNode;
};

const getAuthenticatedHomeRoute = (role: string | undefined) => {
  if (role === "ADMIN") {
    return "/dashboard";
  }

  return "/listing";
};

export function GuestRoute({ children }: GuestRoutePropsI) {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const user = useAppSelector(selectCurrentUser);

  if (isAuthenticated) {
    return <Navigate to={getAuthenticatedHomeRoute(user?.role)} replace />;
  }

  return children;
}
