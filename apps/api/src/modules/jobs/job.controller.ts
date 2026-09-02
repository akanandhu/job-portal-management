import type { Request, Response } from "express";
import { JobQueryValidationError, listJobs } from "./job.service";

export async function listJobsController(req: Request, res: Response) {
  try {
    const jobs = await listJobs(req.query);

    return res.status(200).json(jobs);
  } catch (error) {
    if (error instanceof JobQueryValidationError) {
      return res.status(400).json({ message: error.message });
    }

    return res.status(500).json({ message: "Failed to fetch jobs" });
  }
}
