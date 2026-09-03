import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router";

import { useAppSelector } from "@/app/hook";
import { selectIsAuthenticated } from "@/features/auth/store/auth-selectors";

type ProtectedRoutePropsI = {
  children: ReactNode;
};

export function ProtectedRoute({ children }: ProtectedRoutePropsI) {
  const location = useLocation();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
}
