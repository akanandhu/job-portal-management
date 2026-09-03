export type AccessTokenPayloadI = {
  userId: string;
  role: UserRoleI;
};
export type UserRoleI = "USER" | "ADMIN";

export type CreateRefreshTokenI = {
  tokenHash: string;
  userId: string;
  expiresAt: string;
};

export type CreateUserI = {
  name: string;
  email: string;
  passwordHash: string;
  role: UserRoleI;
};
