import type { Request, Response } from "express";
import {
  getCandidateProfile,
  ProfileValidationError,
  saveCandidateProfile,
} from "./profile.service";

function getAuthenticatedUserId(req: Request) {
  return req.user?.id;
}

export async function getProfileController(req: Request, res: Response) {
  const userId = getAuthenticatedUserId(req);

  if (!userId) {
    return res.status(401).json({ message: "Authentication required" });
  }

  const profile = await getCandidateProfile(userId);

  return res.status(200).json({ data: profile });
}

export async function updateProfileController(req: Request, res: Response) {
  const userId = getAuthenticatedUserId(req);

  if (!userId) {
    return res.status(401).json({ message: "Authentication required" });
  }

  try {
    const profile = await saveCandidateProfile(userId, req.body);

    return res.status(200).json({ data: profile });
  } catch (error) {
    if (error instanceof ProfileValidationError) {
      return res.status(400).json({ message: error.message });
    }

    return res.status(500).json({ message: "Failed to save profile" });
  }
}
