import { z } from "zod";
import {
  DEFAULT_LIMIT,
  DEFAULT_PAGE,
  MAX_LIMIT,
  positiveIntegerSchema,
  queryValueSchema,
} from "./query";

export const jobCategories = [
  "ENGINEERING",
  "DESIGN",
  "MARKETING",
  "SALES",
  "FINANCE",
  "HUMAN_RESOURCES",
  "CUSTOMER_SUPPORT",
  "OPERATIONS",
] as const;

export const experienceLevels = ["ENTRY", "MID", "SENIOR"] as const;
export const jobStatuses = ["DRAFT", "PUBLISHED", "CLOSED"] as const;

const DEFAULT_FEATURED_LIMIT = 6;

export const listJobsQuerySchema = z.object({
  page: positiveIntegerSchema(DEFAULT_PAGE),
  limit: positiveIntegerSchema(DEFAULT_LIMIT).transform((limit) =>
    Math.min(limit, MAX_LIMIT),
  ),
  category: queryValueSchema(z.enum(jobCategories).optional()),
  experienceLevel: queryValueSchema(z.enum(experienceLevels).optional()),
});

export const featuredJobsQuerySchema = z.object({
  limit: positiveIntegerSchema(DEFAULT_FEATURED_LIMIT).transform((limit) =>
    Math.min(limit, MAX_LIMIT),
  ),
});

export const jobIdParamsSchema = z.object({
  id: z.uuid(),
});

export const createJobSchema = z.object({
  title: z.string().trim().min(1),
  description: z.string().trim().min(1),
  company: z.string().trim().min(1),
  location: z.string().trim().min(1),
  category: z.enum(jobCategories),
  experienceLevel: z.enum(experienceLevels),
  status: z.enum(jobStatuses).default("DRAFT"),
  isFeatured: z.boolean().default(false),
});

export const updateJobSchema = createJobSchema
  .partial()
  .refine((value) => Object.keys(value).length > 0, {
    message: "At least one field is required",
  });

export type JobCategoryI = (typeof jobCategories)[number];
export type ExperienceLevelI = (typeof experienceLevels)[number];
export type JobStatusI = (typeof jobStatuses)[number];
export type FeaturedJobsQueryI = z.infer<typeof featuredJobsQuerySchema>;
export type ListJobsQueryI = z.infer<typeof listJobsQuerySchema>;
export type CreateJobInputI = z.infer<typeof createJobSchema>;
export type UpdateJobInputI = Partial<CreateJobInputI>;
