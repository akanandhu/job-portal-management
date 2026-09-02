import { db } from "../../prisma/db";
import type {
  CreateJobInputI,
  ListJobsQueryI,
  UpdateJobInputI,
} from "./job.types";

function applyJobFilters(query: ListJobsQueryI) {
  let jobsQuery = db.orm.public.Job.where({
    status: "PUBLISHED" as const,
  });

  if (query.category) {
    jobsQuery = jobsQuery.where({
      category: query.category,
    });
  }

  if (query.experienceLevel) {
    jobsQuery = jobsQuery.where({
      experienceLevel: query.experienceLevel,
    });
  }

  return jobsQuery;
}

export async function findJobs(query: ListJobsQueryI) {
  return await applyJobFilters(query)
    .orderBy([(job) => job.createdAt.desc(), (job) => job.id.desc()])
    .offset((query.page - 1) * query.limit)
    .limit(query.limit)
    .all();
}

export async function countJobs(query: ListJobsQueryI) {
  return await applyJobFilters(query).aggregate((aggregate) => ({
    total: aggregate.count(),
  }));
}

export async function findPublishedJobById(id: string) {
  return await db.orm.public.Job.where({
    id,
    status: "PUBLISHED" as const,
  }).first();
}

export async function findJobById(id: string) {
  return await db.orm.public.Job.where({
    id,
  }).first();
}

export async function createJob(data: CreateJobInputI) {
  return await db.orm.public.Job.create(data);
}

export async function updateJob(id: string, data: UpdateJobInputI) {
  return await db.orm.public.Job.where({
    id,
  }).update(data);
}

export async function deleteJob(id: string) {
  return await db.orm.public.Job.where({
    id,
  }).delete();
}
