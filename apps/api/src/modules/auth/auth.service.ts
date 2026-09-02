import {
  createRefreshToken,
  findRefreshTokenByHash,
  findUserByEmail,
  findUserById,
  revokeRefreshToken,
} from "./auth.repository";
import bcrypt from "bcrypt";
import {
  generateAccessToken,
  generateRefreshToken,
  hashRefreshToken,
} from "./token.service";

export async function loginUser(email: string, password: string) {
  const user = await findUserByEmail(email);

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const passwordMatch = await bcrypt.compare(password, user.passwordHash);

  if (!passwordMatch) {
    throw new Error("Invalid email or password");
  }

  const payload = {
    userId: user.id,
    role: user.role,
  };

  const accessToken = generateAccessToken(payload);

  const refreshToken = generateRefreshToken();
  const refreshTokenHash = hashRefreshToken(refreshToken);
  const refreshTokenExpiresInDays = parseInt(
    process.env.REFRESH_TOKEN_EXPIRES_IN_DAYS || "7",
    10,
  );

  const refreshTokenExpiresAt = new Date(
    Date.now() + refreshTokenExpiresInDays * 24 * 60 * 60 * 1000,
  ).toISOString();

  await createRefreshToken({
    tokenHash: refreshTokenHash,
    userId: user.id,
    expiresAt: refreshTokenExpiresAt,
  });

  return {
    user: { id: user.id, email: user.email, name: user.name, role: user.role },
    accessToken,
    refreshToken,
    refreshTokenExpiresInDays,
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
