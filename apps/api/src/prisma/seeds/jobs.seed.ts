import { db } from "../db";

export async function seedJobs() {
  const jobs = [
    {
      id: "10000000-0000-4000-8000-000000000001",
      title: "UI Designer",
      description: "Create visual designs for digital products.",
      company: "Acme Technologies",
      location: "Kochi",
      category: "DESIGN" as const,
      experienceLevel: "MID" as const,
      status: "PUBLISHED" as const,
    },
    {
      id: "10000000-0000-4000-8000-000000000002",
      title: "Backend Developer",
      description: "Develop and maintain server-side applications.",
      company: "Acme Technologies",
      location: "Kochi",
      category: "ENGINEERING" as const,
      experienceLevel: "SENIOR" as const,
      status: "PUBLISHED" as const,
    },
    {
      id: "10000000-0000-4000-8000-000000000003",
      title: "Marketing Specialist",
      description: "Plan and execute marketing campaigns.",
      company: "Acme Technologies",
      location: "Kochi",
      category: "MARKETING" as const,
      experienceLevel: "ENTRY" as const,
      status: "PUBLISHED" as const,
    },
  ];

  for (const job of jobs) {
    const existingJob = await db.orm.public.Job.where({
      id: job.id,
    }).first();

    if (!existingJob) {
      await db.orm.public.Job.create(job);
      console.log(`Job with id ${job.id} created.`);
    } else {
      console.log(`Job with id ${job.id} already exists.`);
    }
  }
}
