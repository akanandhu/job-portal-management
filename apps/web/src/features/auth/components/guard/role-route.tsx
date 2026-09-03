import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router";

import { useAppSelector } from "@/app/hook";
import { selectCurrentUser, selectIsAuthenticated } from "@/features/auth/store/auth-selectors";
import type { UserRoleI } from "@/types/auth";

type RoleRoutePropsI = {
  allowedRoles: UserRoleI[];
  children: ReactNode;
};

const getFallbackRoute = (role: UserRoleI | undefined) => {
  if (role === "ADMIN") {
    return "/dashboard";
  }

  if (role === "USER") {
    return "/listings";
  }

  return "/login";
};

export function RoleRoute({ allowedRoles, children }: RoleRoutePropsI) {
  const location = useLocation();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const user = useAppSelector(selectCurrentUser);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to={getFallbackRoute(user?.role)} replace />;
  }

  return children;
}
