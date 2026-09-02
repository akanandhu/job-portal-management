export const applicationStatuses = [
  "APPLIED",
  "REVIEWING",
  "REJECTED",
  "ACCEPTED",
] as const;

export type ApplicationStatusI = (typeof applicationStatuses)[number];

export type ApplicationSnapshotInputI = {
  userId: string;
  jobId: string;
  yearsOfExperience: number;
  education: string;
  currentCompany: string | null;
  currentRole: string | null;
  expectedSalary: number;
  noticePeriodDays: number;
  skills: readonly string[];
};
