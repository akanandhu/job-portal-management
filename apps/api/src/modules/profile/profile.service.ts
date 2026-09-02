import { parseWithZodValidation } from "../../lib/validation";
import {
  createCandidateProfile,
  findCandidateProfileByUserId,
  updateCandidateProfile,
} from "./profile.repository";
import type { CandidateProfileInputI } from "./profile.types";
import { candidateProfileSchema } from "./profile.validation";

export class ProfileValidationError extends Error {}

function parseProfileBody(body: unknown): CandidateProfileInputI {
  return parseWithZodValidation(
    () => candidateProfileSchema.parse(body),
    (message) => new ProfileValidationError(message),
    {
      fallbackMessage: "Invalid profile",
      fallbackPath: "profile",
    },
  );
}

export async function getCandidateProfile(userId: string) {
  return await findCandidateProfileByUserId(userId);
}

export async function saveCandidateProfile(userId: string, body: unknown) {
  const parsedBody = parseProfileBody(body);
  const existingProfile = await findCandidateProfileByUserId(userId);

  if (existingProfile) {
    return await updateCandidateProfile(userId, parsedBody);
  }

  return await createCandidateProfile(userId, parsedBody);
}
