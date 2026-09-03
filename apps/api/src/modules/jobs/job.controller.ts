import type { Request, Response } from "express";
import {
  createAdminJob,
  deleteAdminJob,
  getJob,
  JobNotFoundError,
  JobQueryValidationError,
  listFeaturedJobs,
  listJobCategories,
  listJobs,
  updateAdminJob,
} from "./job.service";

function handleJobError(error: unknown, res: Response) {
  if (error instanceof JobQueryValidationError) {
    return res.status(400).json({ message: error.message });
  }

  if (error instanceof JobNotFoundError) {
    return res.status(404).json({ message: error.message });
  }

  return res.status(500).json({ message: "Failed to process job request" });
}

export async function listJobsController(req: Request, res: Response) {
  try {
    const jobs = await listJobs(req.query, req.user?.role);

    return res.status(200).json(jobs);
  } catch (error) {
    return handleJobError(error, res);
  }
}

export async function getJobController(req: Request, res: Response) {
  try {
    const job = await getJob(req.params, req.user?.role);

    return res.status(200).json({ data: job });
  } catch (error) {
    return handleJobError(error, res);
  }
}

export async function listFeaturedJobsController(req: Request, res: Response) {
  try {
    const jobs = await listFeaturedJobs(req.query);

    return res.status(200).json(jobs);
  } catch (error) {
    return handleJobError(error, res);
  }
}

export async function listJobCategoriesController(_req: Request, res: Response) {
  try {
    const categories = await listJobCategories();

    return res.status(200).json(categories);
  } catch (error) {
    return handleJobError(error, res);
  }
}

export async function createJobController(req: Request, res: Response) {
  try {
    const job = await createAdminJob(req.body);

    return res.status(201).json({ data: job });
  } catch (error) {
    return handleJobError(error, res);
  }
}

export async function updateJobController(req: Request, res: Response) {
  try {
    const job = await updateAdminJob(req.params, req.body);

    return res.status(200).json({ data: job });
  } catch (error) {
    return handleJobError(error, res);
  }
}

export async function deleteJobController(req: Request, res: Response) {
  try {
    await deleteAdminJob(req.params);

    return res.status(204).send();
  } catch (error) {
    return handleJobError(error, res);
  }
}
