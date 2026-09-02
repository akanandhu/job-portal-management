import { db } from "../../prisma/db";
import type { ApplicationSnapshotInputI } from "./application.types";

export async function findApplicationByUserAndJob(
  userId: string,
  jobId: string,
) {
  return await db.orm.public.Application.where({
    userId,
    jobId,
  }).first();
}

export async function createApplication(data: ApplicationSnapshotInputI) {
  return await db.orm.public.Application.create(data);
}

export async function findApplicationsByUserId(userId: string) {
  return await db.orm.public.Application.where({
    userId,
  })
    .include("job", (job) => job.select("id", "title", "company", "location"))
    .orderBy([
      (application) => application.createdAt.desc(),
      (application) => application.id.desc(),
    ])
    .all();
}
