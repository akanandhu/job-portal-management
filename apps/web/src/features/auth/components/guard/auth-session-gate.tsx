import { useEffect, type ReactNode } from "react";

import { useAppSelector } from "@/app/hook";
import { useRefreshSessionMutation } from "@/features/auth/store/auth-api";
import { selectAuthStatus } from "@/features/auth/store/auth-selectors";

type AuthSessionGatePropsI = {
  children: ReactNode;
};

export function AuthSessionGate({ children }: AuthSessionGatePropsI) {
  const status = useAppSelector(selectAuthStatus);
  const [refreshSession, { isLoading }] = useRefreshSessionMutation();

  useEffect(() => {
    if (status === "idle") {
      refreshSession();
    }
  }, [refreshSession, status]);

  if (status === "idle" || status === "checking" || isLoading) {
    return null;
  }

  return children;
}
