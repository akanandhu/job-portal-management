import type { LoginInputI, RegisterFormInputI, RegisterInputI } from "@job-portal/contracts";

export type LoginFormI = LoginInputI;

export type RegisterFormI = RegisterFormInputI;

export type UserRoleI = "USER" | "ADMIN";

export type AuthUserI = {
  id: string;
  email: string;
  name: string;
  role: UserRoleI;
};

export type AuthStatusI = "idle" | "checking" | "authenticated" | "anonymous";

export type AuthStateI = {
  accessToken: string | null;
  user: AuthUserI | null;
  status: AuthStatusI;
};

export type LoginRequestI = LoginFormI;

export type RegisterRequestI = RegisterInputI;

export type AuthResponseI = {
  message: string;
  accessToken: string;
  user: AuthUserI;
};

export type ApiMessageResponseI = {
  message: string;
};
