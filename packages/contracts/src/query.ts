import { z } from "zod";

export const DEFAULT_PAGE = 1;
export const DEFAULT_LIMIT = 10;
export const MAX_LIMIT = 50;

export const queryValueSchema = <Schema extends z.ZodType>(schema: Schema) =>
  z.preprocess((value) => (Array.isArray(value) ? value[0] : value), schema);

export const positiveIntegerSchema = (defaultValue: number) =>
  queryValueSchema(z.coerce.number().int().positive().default(defaultValue));
