import { z } from "zod";
import { experienceLevels, jobCategories } from "./job.types";

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
