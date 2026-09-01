export type AccessTokenPayloadI = {
  userId: string;
  role: UserRoleI;
};

export type VerifyAccessTokenReturnTypeI = {
  id: string;
  role: UserRoleI;
};

export type UserRoleI = "USER" | "ADMIN";
