import { db } from "../db";

export async function seedJobs() {
  const jobs = [
    {
      id: "10000000-0000-4000-8000-000000000001",
      title: "UI Designer",
      description: "Create visual designs for digital products.",
      company: "Acme Technologies",
      location: "Kochi",
      workplaceType: "HYBRID" as const,
      category: "DESIGN" as const,
      experienceLevel: "MID" as const,
      skills: ["Figma", "UI Design", "Prototyping"],
      status: "PUBLISHED" as const,
      isFeatured: true,
    },
    {
      id: "10000000-0000-4000-8000-000000000002",
      title: "Backend Developer",
      description: "Develop and maintain server-side applications.",
      company: "Acme Technologies",
      location: "Kochi",
      workplaceType: "ON_SITE" as const,
      category: "ENGINEERING" as const,
      experienceLevel: "SENIOR" as const,
      skills: ["Node.js", "TypeScript", "PostgreSQL"],
      status: "PUBLISHED" as const,
      isFeatured: true,
    },
    {
      id: "10000000-0000-4000-8000-000000000003",
      title: "Marketing Specialist",
      description: "Plan and execute marketing campaigns.",
      company: "Acme Technologies",
      location: "Kochi",
      workplaceType: "REMOTE" as const,
      category: "MARKETING" as const,
      experienceLevel: "ENTRY" as const,
      skills: ["SEO", "Content Marketing", "Analytics"],
      status: "PUBLISHED" as const,
      isFeatured: false,
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
