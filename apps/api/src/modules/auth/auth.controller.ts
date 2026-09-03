import type { Request, Response } from "express";
import {
  AuthConflictError,
  AuthValidationError,
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
} from "./auth.service";

function setRefreshTokenCookie(
  res: Response,
  refreshToken: string,
  refreshTokenExpiresInDays: number,
) {
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: refreshTokenExpiresInDays * 24 * 60 * 60 * 1000,
    path: "/auth",
    sameSite: "strict",
  });
}

export async function loginController(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const { refreshToken, refreshTokenExpiresInDays, ...result } = await loginUser(email, password);

    setRefreshTokenCookie(res, refreshToken, refreshTokenExpiresInDays);

    return res.status(200).json({ message: "Login successful", ...result });
  } catch {
    return res.status(401).json({ message: "Invalid email or password" });
  }
}

export async function registerController(req: Request, res: Response) {
  try {
    const { refreshToken, refreshTokenExpiresInDays, ...result } = await registerUser(req.body);

    setRefreshTokenCookie(res, refreshToken, refreshTokenExpiresInDays);

    return res.status(201).json({ message: "Registration successful", ...result });
  } catch (error) {
    if (error instanceof AuthValidationError) {
      return res.status(400).json({ message: error.message });
    }

    if (error instanceof AuthConflictError) {
      return res.status(409).json({ message: error.message });
    }

    return res.status(500).json({ message: "Registration failed" });
  }
}

export async function refreshAccessTokenController(req: Request, res: Response) {
  try {
    const refreshToken = req.cookies?.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({ message: "Refresh token is required" });
    }

    const result = await refreshAccessToken(refreshToken);
    return res.status(200).json({ message: "Access token refreshed successfully", ...result });
  } catch {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/auth",
    });
    return res.status(401).json({ message: "Invalid or expired refresh token" });
  }
}

export async function logoutController(req: Request, res: Response) {
  try {
    const refreshToken = req.cookies?.refreshToken;

    if (refreshToken) {
      await logoutUser(refreshToken);
    }

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/auth",
    });

    return res.status(200).json({ message: "Logout successful" });
  } catch {
    return res.status(500).json({ message: "An error occurred during logout" });
  }
}
