import { z } from "zod";
import { experienceLevels, jobCategories, jobStatuses } from "./job.types";

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;
const MAX_LIMIT = 50;

const queryValueSchema = <Schema extends z.ZodType>(schema: Schema) =>
  z.preprocess((value) => (Array.isArray(value) ? value[0] : value), schema);

const positiveIntegerSchema = (defaultValue: number) =>
  queryValueSchema(z.coerce.number().int().positive().default(defaultValue));

export const listJobsQuerySchema = z.object({
  page: positiveIntegerSchema(DEFAULT_PAGE),
  limit: positiveIntegerSchema(DEFAULT_LIMIT).transform((limit) =>
    Math.min(limit, MAX_LIMIT),
  ),
  category: queryValueSchema(z.enum(jobCategories).optional()),
  experienceLevel: queryValueSchema(z.enum(experienceLevels).optional()),
});

export const jobIdParamsSchema = z.object({
  id: z.string().uuid(),
});

export const createJobSchema = z.object({
  title: z.string().trim().min(1),
  description: z.string().trim().min(1),
  company: z.string().trim().min(1),
  location: z.string().trim().min(1),
  category: z.enum(jobCategories),
  experienceLevel: z.enum(experienceLevels),
  status: z.enum(jobStatuses).default("DRAFT"),
});

export const updateJobSchema = createJobSchema
  .partial()
  .refine((value) => Object.keys(value).length > 0, {
    message: "At least one field is required",
  });
