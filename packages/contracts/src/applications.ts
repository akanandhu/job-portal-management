import { z } from "zod";
import {
  DEFAULT_LIMIT,
  DEFAULT_PAGE,
  MAX_LIMIT,
  positiveIntegerSchema,
  queryValueSchema,
} from "./query";

export const applicationStatuses = ["APPLIED", "REVIEWING", "REJECTED", "ACCEPTED"] as const;

export const applyToJobParamsSchema = z.object({
  jobId: z.uuid(),
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

export const listApplicationsQuerySchema = z.object({
  page: positiveIntegerSchema(DEFAULT_PAGE),
  limit: positiveIntegerSchema(DEFAULT_LIMIT).transform((limit) => Math.min(limit, MAX_LIMIT)),
  status: queryValueSchema(z.union([z.enum(applicationStatuses), z.literal("all")]).optional()),
  yearsOfExperience: queryValueSchema(z.string().optional()),
  search: queryValueSchema(z.string().trim().optional()),
});

export const listAllApplicationsQuerySchema = listApplicationsQuerySchema;
export const listMyApplicationsQuerySchema = listApplicationsQuerySchema
  .omit({ page: true, limit: true })
  .partial();

export type ApplicationStatusI = (typeof applicationStatuses)[number];
export type ApplyToJobParamsI = z.infer<typeof applyToJobParamsSchema>;
export type ApplicationIdParamsI = z.infer<typeof applicationIdParamsSchema>;
export type ListJobApplicationsParamsI = z.infer<typeof listJobApplicationsParamsSchema>;
export type UpdateApplicationStatusInputI = z.infer<typeof updateApplicationStatusSchema>;
export type ListApplicationsQueryI = z.infer<typeof listApplicationsQuerySchema>;
export type ListAllApplicationsQueryI = z.infer<typeof listAllApplicationsQuerySchema>;
export type ListMyApplicationsQueryI = z.infer<typeof listMyApplicationsQuerySchema>;

export type ApplicationSnapshotInputI = {
  userId: string;
  jobId: string;
  yearsOfExperience: number;
  education: string;
  currentCompany: string | null;
  currentRole: string | null;
  expectedSalary: number;
  noticePeriodDays: number;
  skills: readonly string[];
};
