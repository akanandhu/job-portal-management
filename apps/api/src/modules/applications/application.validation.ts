import { z } from "zod";
import { applicationStatuses } from "./application.types";

export const applyToJobParamsSchema = z.object({
  jobId: z.uuid()
});

export const applicationIdParamsSchema = z.object({
  id: z.uuid(),
});

export const listJobApplicationsParamsSchema = z.object({
  jobId: z.uuid(),
});

export const updateApplicationStatusSchema = z.object({
  status: z.enum(applicationStatuses),
});
