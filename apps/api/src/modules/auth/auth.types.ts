export type AccessTokenPayloadI = {
  userId: string;
  role: "USER" | "ADMIN";
};

export type VerifyAccessTokenReturnTypeI = {
  id: string;
  role: "USER" | "ADMIN";
};
