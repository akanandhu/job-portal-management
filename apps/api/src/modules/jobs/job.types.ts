export const jobCategories = [
  "ENGINEERING",
  "DESIGN",
  "MARKETING",
  "SALES",
  "FINANCE",
  "HUMAN_RESOURCES",
  "CUSTOMER_SUPPORT",
  "OPERATIONS",
] as const;

export const experienceLevels = ["ENTRY", "MID", "SENIOR"] as const;
export const jobStatuses = ["DRAFT", "PUBLISHED", "CLOSED"] as const;

export type JobCategoryI = (typeof jobCategories)[number];
export type ExperienceLevelI = (typeof experienceLevels)[number];
export type JobStatusI = (typeof jobStatuses)[number];

export type ListJobsFiltersI = {
  category?: JobCategoryI | undefined;
  experienceLevel?: ExperienceLevelI | undefined;
};

export type ListJobsQueryI = ListJobsFiltersI & {
  page: number;
  limit: number;
};

export type CreateJobInputI = {
  title: string;
  description: string;
  company: string;
  location: string;
  category: JobCategoryI;
  experienceLevel: ExperienceLevelI;
  status: JobStatusI;
};

export type UpdateJobInputI = Partial<CreateJobInputI>;
