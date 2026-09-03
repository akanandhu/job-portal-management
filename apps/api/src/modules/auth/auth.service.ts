import {
  createUser,
  createRefreshToken,
  findRefreshTokenByHash,
  findUserByEmail,
  findUserById,
  revokeRefreshToken,
} from "./auth.repository";
import bcrypt from "bcrypt";
import { registerSchema } from "@job-portal/contracts/auth";
import { parseWithZodValidation } from "../../lib/validation";
import { generateAccessToken, generateRefreshToken, hashRefreshToken } from "./token.service";

export class AuthValidationError extends Error {}

export class AuthConflictError extends Error {}

function createAuthSession(user: {
  id: string;
  email: string;
  name: string;
  role: "USER" | "ADMIN";
}) {
  const payload = {
    userId: user.id,
    role: user.role,
  };

  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken();
  const refreshTokenExpiresInDays = parseInt(process.env.REFRESH_TOKEN_EXPIRES_IN_DAYS || "7", 10);

  const refreshTokenExpiresAt = new Date(
    Date.now() + refreshTokenExpiresInDays * 24 * 60 * 60 * 1000,
  ).toISOString();

  return {
    accessToken,
    refreshToken,
    refreshTokenExpiresAt,
    refreshTokenExpiresInDays,
  };
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

  const session = createAuthSession(user);

  await createRefreshToken({
    tokenHash: hashRefreshToken(session.refreshToken),
    userId: user.id,
    expiresAt: session.refreshTokenExpiresAt,
  });

  return {
    user: { id: user.id, email: user.email, name: user.name, role: user.role },
    accessToken: session.accessToken,
    refreshToken: session.refreshToken,
    refreshTokenExpiresInDays: session.refreshTokenExpiresInDays,
  };
}

export async function registerUser(body: unknown) {
  const parsedBody = parseWithZodValidation(
    () => registerSchema.parse(body),
    (message) => new AuthValidationError(message),
    {
      fallbackMessage: "Invalid registration",
      fallbackPath: "registration",
    },
  );

  const existingUser = await findUserByEmail(parsedBody.email);

  if (existingUser) {
    throw new AuthConflictError("Email is already registered");
  }

  const passwordHash = await bcrypt.hash(parsedBody.password, 12);
  const user = await createUser({
    name: parsedBody.name,
    email: parsedBody.email,
    passwordHash,
    role: "USER",
  });
  const session = createAuthSession(user);

  await createRefreshToken({
    tokenHash: hashRefreshToken(session.refreshToken),
    userId: user.id,
    expiresAt: session.refreshTokenExpiresAt,
  });

  return {
    user: { id: user.id, email: user.email, name: user.name, role: user.role },
    accessToken: session.accessToken,
    refreshToken: session.refreshToken,
    refreshTokenExpiresInDays: session.refreshTokenExpiresInDays,
  };
}

export async function refreshAccessToken(refreshToken: string) {
  const tokenHash = hashRefreshToken(refreshToken);

  const storedToken = await findRefreshTokenByHash(tokenHash);

  if (!storedToken) {
    throw new Error("Invalid refresh token");
  }

  if (storedToken.revokedAt) {
    throw new Error("Refresh token has been revoked");
  }

  if (new Date(storedToken.expiresAt).getTime() <= Date.now()) {
    throw new Error("Refresh token has expired");
  }

  const user = await findUserById(storedToken.userId);

  if (!user) {
    throw new Error("User not found");
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

export async function logoutUser(refreshToken: string) {
  const tokenHash = hashRefreshToken(refreshToken);

  const storedToken = await findRefreshTokenByHash(tokenHash);

  if (!storedToken || storedToken.revokedAt) {
    return;
  }

  await revokeRefreshToken(tokenHash);
}
