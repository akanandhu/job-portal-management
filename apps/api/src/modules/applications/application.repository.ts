import { db } from "../../prisma/db";
import type {
  ApplicationSnapshotInputI,
  ApplicationStatusI,
} from "./application.types";

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

export async function findApplicationsByJobId(jobId: string) {
  return await db.orm.public.Application.where({
    jobId,
  })
    .include("user", (user) => user.select("id", "name", "email"))
    .orderBy([
      (application) => application.createdAt.desc(),
      (application) => application.id.desc(),
    ])
    .all();
}

export async function findApplicationById(id: string) {
  return await db.orm.public.Application.where({
    id,
  }).first();
}

export async function updateApplicationStatus(
  id: string,
  status: ApplicationStatusI,
) {
  return await db.orm.public.Application.where({
    id,
  }).update({
    status,
  });
}
