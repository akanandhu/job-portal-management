import { parseWithZodValidation } from "../../lib/validation";
import { findJobById } from "../jobs/job.repository";
import { findCandidateProfileByUserId } from "../profile/profile.repository";
import {
  createApplication,
  findApplicationByUserAndJob,
  findApplicationsByUserId,
} from "./application.repository";
import { applyToJobParamsSchema } from "./application.validation";

export class ApplicationValidationError extends Error {}
export class ApplicationConflictError extends Error {}
export class ApplicationUnavailableError extends Error {}

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

export async function applyToJob(
  userId: string,
  params: Record<string, unknown>,
) {
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
    throw new ApplicationValidationError(
      "Complete your profile before applying",
    );
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

export async function listMyApplications(userId: string) {
  return await findApplicationsByUserId(userId);
}
