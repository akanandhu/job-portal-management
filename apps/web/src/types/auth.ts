export type LoginFormI = {
  email: string;
  password: string;
};

export type RegisterFormI = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

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

export type AuthResponseI = {
  message: string;
  accessToken: string;
  user: AuthUserI;
};

export type ApiMessageResponseI = {
  message: string;
};
