import type { Request, Response } from "express";
import {
  ApplicationConflictError,
  ApplicationUnavailableError,
  ApplicationValidationError,
  applyToJob,
  listMyApplications,
} from "./application.service";

function getAuthenticatedUserId(req: Request) {
  return req.user?.id;
}

function handleApplicationError(error: unknown, res: Response) {
  if (error instanceof ApplicationValidationError) {
    return res.status(400).json({ message: error.message });
  }

  if (error instanceof ApplicationUnavailableError) {
    return res.status(404).json({ message: error.message });
  }

  if (error instanceof ApplicationConflictError) {
    return res.status(409).json({ message: error.message });
  }

  return res.status(500).json({ message: "Failed to process application" });
}

export async function applyToJobController(req: Request, res: Response) {
  const userId = getAuthenticatedUserId(req);

  if (!userId) {
    return res.status(401).json({ message: "Authentication required" });
  }

  try {
    const application = await applyToJob(userId, req.params);

    return res.status(201).json({ data: application });
  } catch (error) {
    return handleApplicationError(error, res);
  }
}

export async function listMyApplicationsController(req: Request, res: Response) {
  const userId = getAuthenticatedUserId(req);

  if (!userId) {
    return res.status(401).json({ message: "Authentication required" });
  }

  try {
    const applications = await listMyApplications(userId);

    return res.status(200).json({ data: applications });
  } catch (error) {
    return handleApplicationError(error, res);
  }
}
