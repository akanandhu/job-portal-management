import type { AdminApplicationI } from "@/features/dashboard/data/dashboard-data";
import type { ApplicationDataI } from "@/types/applications";

export function formatApplication(
  app: ApplicationDataI,
  defaultCandidateName?: string,
): AdminApplicationI {
  const candidateName =
    typeof app.candidate === "string"
      ? app.candidate
      : (app.candidate?.name ?? app.user?.name ?? defaultCandidateName ?? "Candidate");

  const profile = app.profile ?? {};

  return {
    id: app.id,
    jobId: app.jobId ?? "",
    candidate: candidateName,
    status: app.status,
    appliedAt: app.createdAt ? "Applied recently" : "Just now",
    phone: app.phone ?? profile.phone ?? "",
    yearsOfExperience: app.yearsOfExperience ?? profile.yearsOfExperience ?? 0,
    education: app.education ?? profile.education ?? "",
    currentCompany: app.currentCompany ?? profile.currentCompany ?? null,
    currentRole: app.currentRole ?? profile.currentRole ?? null,
    expectedSalary: app.expectedSalary ?? profile.expectedSalary ?? 0,
    noticePeriodDays: app.noticePeriodDays ?? profile.noticePeriodDays ?? 0,
    skills: app.skills ?? profile.skills ?? [],
  };
}

export function formatApplications(
  apps: ApplicationDataI[],
  defaultCandidateName?: string,
): AdminApplicationI[] {
  return apps.map((app) => formatApplication(app, defaultCandidateName));
}
