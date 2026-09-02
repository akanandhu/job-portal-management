import {
  countJobs,
  createJob,
  deleteJob,
  findJobById,
  findJobs,
  findPublishedJobById,
  updateJob,
} from "./job.repository";
import type {
  CreateJobInputI,
  ListJobsQueryI,
  UpdateJobInputI,
} from "./job.types";
import {
  createJobSchema,
  jobIdParamsSchema,
  listJobsQuerySchema,
  updateJobSchema,
} from "./job.validation";
import { ZodError } from "zod";

export class JobQueryValidationError extends Error {}
export class JobNotFoundError extends Error {}

function parseWithJobValidation<Output>(
  parser: () => Output,
): Output {
  try {
    return parser();
  } catch (error) {
    if (error instanceof ZodError) {
      throw new JobQueryValidationError(getValidationMessage(error));
    }

    throw error;
  }
}

function getValidationMessage(error: ZodError) {
  const issue = error.issues[0];

  if (!issue) {
    return "Invalid jobs query";
  }

  const fieldName = issue.path.join(".") || "query";

  return `${fieldName}: ${issue.message}`;
}

export function parseListJobsQuery(query: Record<string, unknown>): ListJobsQueryI {
  return parseWithJobValidation(() => listJobsQuerySchema.parse(query));
}

function parseJobId(params: Record<string, unknown>) {
  return parseWithJobValidation(() => jobIdParamsSchema.parse(params).id);
}

function parseCreateJobBody(body: unknown): CreateJobInputI {
  return parseWithJobValidation(() => createJobSchema.parse(body));
}

function parseUpdateJobBody(body: unknown): UpdateJobInputI {
  return parseWithJobValidation(() => {
    const parsedBody = updateJobSchema.parse(body);
    const updateData: UpdateJobInputI = {};

    if (parsedBody.title !== undefined) {
      updateData.title = parsedBody.title;
    }

    if (parsedBody.description !== undefined) {
      updateData.description = parsedBody.description;
    }

    if (parsedBody.company !== undefined) {
      updateData.company = parsedBody.company;
    }

    if (parsedBody.location !== undefined) {
      updateData.location = parsedBody.location;
    }

    if (parsedBody.category !== undefined) {
      updateData.category = parsedBody.category;
    }

    if (parsedBody.experienceLevel !== undefined) {
      updateData.experienceLevel = parsedBody.experienceLevel;
    }

    if (parsedBody.status !== undefined) {
      updateData.status = parsedBody.status;
    }

    return updateData;
  });
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

export async function getJob(params: Record<string, unknown>) {
  const id = parseJobId(params);
  const job = await findPublishedJobById(id);

  if (!job) {
    throw new JobNotFoundError("Job not found");
  }

  return job;
}

export async function createAdminJob(body: unknown) {
  const parsedBody = parseCreateJobBody(body);

  return await createJob(parsedBody);
}

export async function updateAdminJob(
  params: Record<string, unknown>,
  body: unknown,
) {
  const id = parseJobId(params);
  const existingJob = await findJobById(id);

  if (!existingJob) {
    throw new JobNotFoundError("Job not found");
  }

  const parsedBody = parseUpdateJobBody(body);

  return await updateJob(id, parsedBody);
}

export async function deleteAdminJob(params: Record<string, unknown>) {
  const id = parseJobId(params);
  const existingJob = await findJobById(id);

  if (!existingJob) {
    throw new JobNotFoundError("Job not found");
  }

  await deleteJob(id);
}
