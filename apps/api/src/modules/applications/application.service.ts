import { parseWithZodValidation } from "../../lib/validation";
import { findJobById } from "../jobs/job.repository";
import { findCandidateProfileByUserId } from "../profile/profile.repository";
import {
  createApplication,
  countAllApplications,
  findApplicationById,
  findApplicationByUserAndJob,
  findApplicationsByJobId,
  findApplicationsByUserId,
  listAllApplications as findAllApplications,
  updateApplicationStatus,
} from "./application.repository";
import type { ApplicationStatusI } from "./application.types";
import {
  applicationIdParamsSchema,
  applyToJobParamsSchema,
  listAllApplicationsQuerySchema,
  listMyApplicationsQuerySchema,
  listJobApplicationsParamsSchema,
  updateApplicationStatusSchema,
} from "./application.validation";

export class ApplicationValidationError extends Error {}
export class ApplicationConflictError extends Error {}
export class ApplicationUnavailableError extends Error {}
export class ApplicationNotFoundError extends Error {}

function parseApplyJobId(params: Record<string, unknown>) {
  return parseWithZodValidation(
    () => applyToJobParamsSchema.parse(params).jobId,
    (message) => new ApplicationValidationError(message),
    {
      fallbackMessage: "Invalid application request",
      fallbackPath: "jobId",
    },
  );
}

function parseJobApplicationsJobId(params: Record<string, unknown>) {
  return parseWithZodValidation(
    () => listJobApplicationsParamsSchema.parse(params).jobId,
    (message) => new ApplicationValidationError(message),
    {
      fallbackMessage: "Invalid application request",
      fallbackPath: "jobId",
    },
  );
}

function parseApplicationId(params: Record<string, unknown>) {
  return parseWithZodValidation(
    () => applicationIdParamsSchema.parse(params).id,
    (message) => new ApplicationValidationError(message),
    {
      fallbackMessage: "Invalid application request",
      fallbackPath: "id",
    },
  );
}

function parseApplicationStatus(body: unknown): ApplicationStatusI {
  return parseWithZodValidation(
    () => updateApplicationStatusSchema.parse(body).status,
    (message) => new ApplicationValidationError(message),
    {
      fallbackMessage: "Invalid application status",
      fallbackPath: "status",
    },
  );
}

export async function applyToJob(userId: string, params: Record<string, unknown>) {
  const jobId = parseApplyJobId(params);
  const job = await findJobById(jobId);

  if (!job || job.status !== "PUBLISHED") {
    throw new ApplicationUnavailableError("Job is not available");
  }

  const existingApplication = await findApplicationByUserAndJob(userId, jobId);

  if (existingApplication) {
    throw new ApplicationConflictError("Already applied");
  }

  const profile = await findCandidateProfileByUserId(userId);

  if (!profile) {
    throw new ApplicationValidationError("Complete your profile before applying");
  }

  return await createApplication({
    userId,
    jobId,
    yearsOfExperience: profile.yearsOfExperience,
    education: profile.education,
    currentCompany: profile.currentCompany,
    currentRole: profile.currentRole,
    expectedSalary: profile.expectedSalary,
    noticePeriodDays: profile.noticePeriodDays,
    skills: profile.skills,
  });
}

export async function listMyApplications(userId: string, query: Record<string, unknown> = {}) {
  const parsedQuery = parseWithZodValidation(
    () => listMyApplicationsQuerySchema.parse(query),
    (message) => new ApplicationValidationError(message),
    {
      fallbackMessage: "Invalid application request",
      fallbackPath: "query",
    },
  );

  return await findApplicationsByUserId(userId, parsedQuery);
}

export async function listAllApplications(query: Record<string, unknown>) {
  const parsedQuery = parseWithZodValidation(
    () => listAllApplicationsQuerySchema.parse(query),
    (message) => new ApplicationValidationError(message),
    {
      fallbackMessage: "Invalid application request",
      fallbackPath: "query",
    },
  );

  const [applications, countResult] = await Promise.all([
    findAllApplications(parsedQuery),
    countAllApplications(parsedQuery),
  ]);
  const total = countResult.total;

  return {
    data: applications,
    meta: {
      page: parsedQuery.page,
      limit: parsedQuery.limit,
      total,
      totalPages: Math.ceil(total / parsedQuery.limit),
    },
  };
}

export async function listJobApplications(params: Record<string, unknown>) {
  const jobId = parseJobApplicationsJobId(params);
  const job = await findJobById(jobId);

  if (!job) {
    throw new ApplicationUnavailableError("Job not found");
  }

  const applications = await findApplicationsByJobId(jobId);

  return applications.map((application) => ({
    id: application.id,
    jobId: application.jobId,
    userId: application.userId,
    status: application.status,
    createdAt: application.createdAt,
    yearsOfExperience: application.yearsOfExperience,
    education: application.education,
    currentCompany: application.currentCompany,
    currentRole: application.currentRole,
    expectedSalary: application.expectedSalary,
    noticePeriodDays: application.noticePeriodDays,
    skills: application.skills,
    user: {
      id: application.user.id,
      name: application.user.name,
      email: application.user.email,
    },
    candidate: {
      id: application.user.id,
      name: application.user.name,
      email: application.user.email,
    },
    profile: {
      yearsOfExperience: application.yearsOfExperience,
      education: application.education,
      currentCompany: application.currentCompany,
      currentRole: application.currentRole,
      expectedSalary: application.expectedSalary,
      noticePeriodDays: application.noticePeriodDays,
      skills: application.skills,
    },
  }));
}

export async function changeApplicationStatus(params: Record<string, unknown>, body: unknown) {
  const id = parseApplicationId(params);
  const status = parseApplicationStatus(body);
  const application = await findApplicationById(id);

  if (!application) {
    throw new ApplicationNotFoundError("Application not found");
  }

  return await updateApplicationStatus(id, status);
}
