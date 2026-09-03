import { db } from "../../prisma/db";
import type {
  ApplicationSnapshotInputI,
  ApplicationStatusI,
  ListAllApplicationsQueryI,
  ListMyApplicationsQueryI,
} from "./application.types";

export async function findApplicationByUserAndJob(userId: string, jobId: string) {
  return await db.orm.public.Application.where({
    userId,
    jobId,
  }).first();
}

export async function createApplication(data: ApplicationSnapshotInputI) {
  return await db.orm.public.Application.create(data);
}

function applyApplicationFilters(
  query: ListAllApplicationsQueryI,
  baseQuery = db.orm.public.Application,
) {
  let appQuery = baseQuery;

  if (query.status && query.status !== "all") {
    appQuery = appQuery.where({ status: query.status as ApplicationStatusI });
  }

  if (query.yearsOfExperience && query.yearsOfExperience !== "all") {
    const minYears = parseInt(query.yearsOfExperience, 10);
    if (!isNaN(minYears)) {
      appQuery = appQuery.where({
        yearsOfExperience: minYears,
      });
    }
  }

  return appQuery;
}

export async function listAllApplications(query: ListAllApplicationsQueryI) {
  return await applyApplicationFilters(query)
    .include("user", (user) => user.select("id", "name", "email"))
    .include("job", (job) => job.select("id", "title", "company", "location", "category"))
    .orderBy([
      (application) => application.createdAt.desc(),
      (application) => application.id.desc(),
    ])
    .offset((query.page - 1) * query.limit)
    .limit(query.limit)
    .all();
}

export async function countAllApplications(query?: ListAllApplicationsQueryI) {
  const appQuery = query ? applyApplicationFilters(query) : db.orm.public.Application;
  return await appQuery.aggregate((aggregate) => ({
    total: aggregate.count(),
  }));
}

export async function findApplicationsByUserId(userId: string, query?: ListMyApplicationsQueryI) {
  let appQuery = db.orm.public.Application.where({
    userId,
  });

  if (query?.status && query.status !== "all") {
    appQuery = appQuery.where({ status: query.status as ApplicationStatusI });
  }

  if (query?.yearsOfExperience && query.yearsOfExperience !== "all") {
    const minYears = parseInt(query.yearsOfExperience, 10);
    if (!isNaN(minYears)) {
      appQuery = appQuery.where({
        yearsOfExperience: minYears,
      });
    }
  }

  return await appQuery
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

export async function updateApplicationStatus(id: string, status: ApplicationStatusI) {
  return await db.orm.public.Application.where({
    id,
  }).update({
    status,
  });
}
