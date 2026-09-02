import {
  countJobs,
  countPublishedJobsByCategory,
  createJob,
  deleteJob,
  findJobById,
  findFeaturedJobs,
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
  featuredJobsQuerySchema,
  jobIdParamsSchema,
  listJobsQuerySchema,
  updateJobSchema,
} from "./job.validation";
import { parseWithZodValidation } from "../../lib/validation";

export class JobQueryValidationError extends Error {}
export class JobNotFoundError extends Error {}

const parseJobSchema = <Output>(parser: () => Output) =>
  parseWithZodValidation(
    parser,
    (message) => new JobQueryValidationError(message),
    {
      fallbackMessage: "Invalid jobs request",
      fallbackPath: "job",
    },
  );

export function parseListJobsQuery(query: Record<string, unknown>): ListJobsQueryI {
  return parseJobSchema(() => listJobsQuerySchema.parse(query));
}

function parseFeaturedJobsQuery(query: Record<string, unknown>) {
  return parseJobSchema(() => featuredJobsQuerySchema.parse(query));
}

function parseJobId(params: Record<string, unknown>) {
  return parseJobSchema(() => jobIdParamsSchema.parse(params).id);
}

function parseCreateJobBody(body: unknown): CreateJobInputI {
  return parseJobSchema(() => createJobSchema.parse(body));
}

function parseUpdateJobBody(body: unknown): UpdateJobInputI {
  return parseJobSchema(() => {
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

    if (parsedBody.workplaceType !== undefined) {
      updateData.workplaceType = parsedBody.workplaceType;
    }

    if (parsedBody.category !== undefined) {
      updateData.category = parsedBody.category;
    }

    if (parsedBody.experienceLevel !== undefined) {
      updateData.experienceLevel = parsedBody.experienceLevel;
    }

    if (parsedBody.skills !== undefined) {
      updateData.skills = parsedBody.skills;
    }

    if (parsedBody.status !== undefined) {
      updateData.status = parsedBody.status;
    }

    if (parsedBody.isFeatured !== undefined) {
      updateData.isFeatured = parsedBody.isFeatured;
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

export async function listFeaturedJobs(query: Record<string, unknown>) {
  const parsedQuery = parseFeaturedJobsQuery(query);
  const jobs = await findFeaturedJobs(parsedQuery);

  return {
    data: jobs,
  };
}

export async function listJobCategories() {
  const categories = await countPublishedJobsByCategory();

  return {
    data: categories
      .map((category) => ({
        category: category.category,
        count: category.count,
      }))
      .sort(
        (left, right) =>
          right.count - left.count || left.category.localeCompare(right.category),
      ),
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
