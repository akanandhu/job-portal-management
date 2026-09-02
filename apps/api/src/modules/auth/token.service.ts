import type { SignOptions } from "jsonwebtoken";
import type { AccessTokenPayloadI } from "./auth.types";
import jwt from "jsonwebtoken";
import crypto from "node:crypto";

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

  return jwt.verify(token, secret) as AccessTokenPayloadI;
}

export function generateRefreshToken() {
  return crypto.randomBytes(64).toString("hex");
}

export function hashRefreshToken(token: string) {
  return crypto.createHash("sha256").update(token).digest("hex");
}
