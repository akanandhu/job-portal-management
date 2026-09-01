import type { SignOptions } from "jsonwebtoken";
import type {
  AccessTokenPayloadI,
  VerifyAccessTokenReturnTypeI,
} from "./auth.types";
import jwt from "jsonwebtoken";

export function generateAccessToken(payload: AccessTokenPayloadI) {
  const secret = process.env.JWT_ACCESS_SECRET;
  const expiresIn = process.env.JWT_ACCESS_EXPIRES_IN || "15m";

  if (!secret) {
    throw new Error(
      "JWT_ACCESS_SECRET is not configured in the environment variables.",
    );
  }

  return jwt.sign(payload, secret, {
    expiresIn: expiresIn,
  } as SignOptions);
}

export function verifyAccessToken(token: string) {
  const secret = process.env.JWT_ACCESS_SECRET;
  if (!secret) {
    throw new Error(
      "JWT_ACCESS_SECRET is not configured in the environment variables.",
    );
  }

  return jwt.verify(token, secret) as VerifyAccessTokenReturnTypeI;
}
