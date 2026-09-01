import { findUserByEmail } from "./auth.repository";
import bcrypt from "bcrypt";
import jwt, { type SignOptions } from "jsonwebtoken";
import type { AccessTokenPayloadI, VerifyAccessTokenReturnTypeI } from "./auth.types";

function generateAccessToken(payload: AccessTokenPayloadI) {
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
    if(!secret) {
        throw new Error("JWT_ACCESS_SECRET is not configured in the environment variables.");
    }

    return jwt.verify(token, secret) as VerifyAccessTokenReturnTypeI;
}

export async function loginUser(email: string, password: string) {
  const user = await findUserByEmail(email);

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const passwordMatch = await bcrypt.compare(password, user.passwordHash);

  if (!passwordMatch) {
    throw new Error("Invalid email or password");
  }

  const accessToken = generateAccessToken({
    userId: user.id,
    role: user.role,
  });

  return {
    user: { id: user.id, email: user.email, name: user.name, role: user.role },
    accessToken,
  };
}
