import type { Request, Response } from "express";
import {
  ApplicationConflictError,
  ApplicationNotFoundError,
  ApplicationUnavailableError,
  ApplicationValidationError,
  applyToJob,
  changeApplicationStatus,
  listAllApplications,
  listJobApplications,
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

  if (error instanceof ApplicationNotFoundError) {
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

    return res.status(201).json({
      message: "Application submitted successfully",
      data: application,
    });
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
    const applications = await listMyApplications(userId, req.query);

    return res.status(200).json({ data: applications });
  } catch (error) {
    return handleApplicationError(error, res);
  }
}

export async function listAllApplicationsController(req: Request, res: Response) {
  try {
    const applications = await listAllApplications(req.query);

    return res.status(200).json(applications);
  } catch (error) {
    return handleApplicationError(error, res);
  }
}

export async function listJobApplicationsController(req: Request, res: Response) {
  try {
    const applications = await listJobApplications(req.params);

    return res.status(200).json({ data: applications });
  } catch (error) {
    return handleApplicationError(error, res);
  }
}

export async function updateApplicationStatusController(req: Request, res: Response) {
  try {
    const application = await changeApplicationStatus(req.params, req.body);

    return res.status(200).json({ data: application });
  } catch (error) {
    return handleApplicationError(error, res);
  }
}
