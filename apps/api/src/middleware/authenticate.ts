import type { NextFunction, Request, Response } from "express";
import { verifyAccessToken } from "../modules/auth/token.service";

export function authenticate(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Authentication required",});
    }

    const token = authHeader.split(" ")[1] as string;

    try {
        const payload = verifyAccessToken(token);
        req.user = payload
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token",});
    }
} 