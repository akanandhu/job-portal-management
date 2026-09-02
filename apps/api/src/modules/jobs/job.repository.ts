import { db } from "../../prisma/db";
import type { ListJobsQueryI } from "./job.types";

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
