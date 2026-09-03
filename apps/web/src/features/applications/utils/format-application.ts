import type { AdminApplicationI } from "@/features/dashboard/data/dashboard-data";
import type { ApplicationDataI } from "@/types/applications";

export function formatApplication(
  app: ApplicationDataI,
  defaultCandidateName?: string,
): AdminApplicationI {
  return {
    id: app.id,
    jobId: app.jobId,
    candidate: app.user?.name ?? defaultCandidateName ?? "Candidate",
    status: app.status,
    appliedAt: app.createdAt ? "Applied recently" : "Just now",
    phone: "",
    yearsOfExperience: app.yearsOfExperience ?? 0,
    education: app.education ?? "",
    currentCompany: app.currentCompany ?? null,
    currentRole: app.currentRole ?? null,
    expectedSalary: app.expectedSalary ?? 0,
    noticePeriodDays: app.noticePeriodDays ?? 0,
    skills: app.skills ?? [],
  };
}

export function formatApplications(
  apps: ApplicationDataI[],
  defaultCandidateName?: string,
): AdminApplicationI[] {
  return apps.map((app) => formatApplication(app, defaultCandidateName));
}
