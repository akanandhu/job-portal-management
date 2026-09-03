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
export const workplaceTypes = ["ON_SITE", "REMOTE", "HYBRID"] as const;

const DEFAULT_FEATURED_LIMIT = 6;

export const listJobsQuerySchema = z.object({
  page: positiveIntegerSchema(DEFAULT_PAGE),
  limit: positiveIntegerSchema(DEFAULT_LIMIT).transform((limit) => Math.min(limit, MAX_LIMIT)),
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
  title: z.string().trim().min(1, "Job title is required"),
  description: z.string().trim().min(1, "Job description is required"),
  company: z.string().trim().min(1, "Company name is required"),
  location: z.string().trim().min(1, "Location is required"),
  workplaceType: z.enum(workplaceTypes),
  category: z.enum(jobCategories),
  experienceLevel: z.enum(experienceLevels),
  skills: z
    .array(z.string().trim().min(1, "Skill cannot be empty"))
    .min(1, "Add at least one skill"),
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
export type WorkplaceTypeI = (typeof workplaceTypes)[number];
export type FeaturedJobsQueryI = z.infer<typeof featuredJobsQuerySchema>;
export type ListJobsQueryI = z.infer<typeof listJobsQuerySchema>;
export type CreateJobInputI = z.infer<typeof createJobSchema>;
export type UpdateJobInputI = Partial<CreateJobInputI>;
