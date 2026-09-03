import type { NextFunction, Request, Response } from "express";
import { verifyAccessToken } from "../modules/auth/token.service";

export function optionalAuthenticate(req: Request, _res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    next();
    return;
  }

  const token = authHeader.split(" ")[1] as string;

  try {
    const payload = verifyAccessToken(token);
    req.user = {
      id: payload.userId,
      role: payload.role,
    };
  } catch {
    delete req.user;
  }

  next();
}
