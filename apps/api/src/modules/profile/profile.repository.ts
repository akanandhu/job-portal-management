import { db } from "../../prisma/db";
import type { CandidateProfileInputI } from "./profile.types";

export async function findCandidateProfileByUserId(userId: string) {
  return await db.orm.public.CandidateProfile.where({
    userId,
  }).first();
}

export async function createCandidateProfile(userId: string, data: CandidateProfileInputI) {
  return await db.orm.public.CandidateProfile.create({
    userId,
    ...data,
  });
}

export async function updateCandidateProfile(userId: string, data: CandidateProfileInputI) {
  return await db.orm.public.CandidateProfile.where({
    userId,
  }).update(data);
}
