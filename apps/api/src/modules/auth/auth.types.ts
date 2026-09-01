export type AccessTokenPayloadI = {
  userId: string;
  role: UserRoleI;
};

export type VerifyAccessTokenReturnTypeI = {
  id: string;
  role: UserRoleI;
};

export type UserRoleI = "USER" | "ADMIN";

export type CreateRefreshTokenI = {
  tokenHash: string;
  userId: string;
  expiresAt: string;
}