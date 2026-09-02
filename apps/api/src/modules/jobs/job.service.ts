import { countJobs, findJobs } from "./job.repository";
import type { ListJobsQueryI } from "./job.types";
import { listJobsQuerySchema } from "./job.validation";
import { ZodError } from "zod";

export class JobQueryValidationError extends Error {}

function getValidationMessage(error: ZodError) {
  const issue = error.issues[0];

  if (!issue) {
  return "Invalid jobs query";
  }
  
  const fieldName = issue.path.join(".") || "query";

  return `${fieldName}: ${issue.message}`;
}

export function parseListJobsQuery(query: Record<string, unknown>): ListJobsQueryI {
  try {
    return listJobsQuerySchema.parse(query);
  } catch (error) {
    if (error instanceof ZodError) {
      throw new JobQueryValidationError(getValidationMessage(error));
    }
  
    throw error;
  }
}

export async function listJobs(query: Record<string, unknown>) {
  const parsedQuery = parseListJobsQuery(query);
  const [jobs, countResult] = await Promise.all([
    findJobs(parsedQuery),
    countJobs(parsedQuery),
  ]);
  const total = countResult.total;

  return {
    data: jobs,
    meta: {
      page: parsedQuery.page,
      limit: parsedQuery.limit,
      total,
      totalPages: Math.ceil(total / parsedQuery.limit),
    },
  };
}