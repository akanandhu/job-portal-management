import { applicationStatuses } from "@job-portal/contracts/applications";

import type {
  AdminApplicationI,
  AdminJobI,
} from "@/features/dashboard/data/dashboard-data";
import type { DashboardTabI } from "@/types/dashboard";

export type AdminDashboardViewI =
  | { type: "jobs.list" }
  | { type: "jobs.detail"; job: AdminJobI }
  | { type: "jobs.form"; mode: "add"; job?: undefined }
  | { type: "jobs.form"; mode: "edit"; job: AdminJobI }
  | { type: "applications.list" }
  | {
      type: "applications.detail";
      application: AdminApplicationI;
      job: AdminJobI;
    }
  | {
      type: "candidate-profile.form";
      application: AdminApplicationI;
      job: AdminJobI;
    };

type AdminDashboardViewParamsI = {
  activeNav: string;
  applications: AdminApplicationI[];
  jobs: AdminJobI[];
  searchParams: URLSearchParams;
};

export const defaultSection = "jobs";
export const defaultJobTab = "all-jobs";
export const defaultApplicationTab = applicationStatuses[0];

export const hasItem = <Item extends { id: string }>(
  items: readonly Item[],
  id: string,
) => items.some((item) => item.id === id);

export const formatOptionLabel = (value: string) =>
  value
    .toLowerCase()
    .split("_")
    .map((part) => part.slice(0, 1).toUpperCase() + part.slice(1))
    .join(" ");

export const jobTabs: DashboardTabI[] = [
  { id: defaultJobTab, label: "All Jobs" },
];

export const applicationTabs: DashboardTabI[] = applicationStatuses.map(
  (status) => ({
    id: status,
    label: formatOptionLabel(status),
  }),
);

export function getAdminDashboardView({
  activeNav,
  applications,
  jobs,
  searchParams,
}: AdminDashboardViewParamsI): AdminDashboardViewI {
  const mode = searchParams.get("mode");

  if (activeNav === "jobs" && mode === "add") {
    return { type: "jobs.form", mode: "add" };
  }

  if (activeNav === "jobs" && mode === "edit") {
    const job = jobs.find((item) => item.id === searchParams.get("jobId"));
    return job ? { type: "jobs.form", mode: "edit", job } : { type: "jobs.list" };
  }

  if (activeNav === "jobs") {
    const job = jobs.find((item) => item.id === searchParams.get("jobId"));
    return job ? { type: "jobs.detail", job } : { type: "jobs.list" };
  }

  const application = applications.find(
    (item) => item.id === searchParams.get("applicationId"),
  );
  const job = jobs.find((item) => item.id === application?.jobId);

  if (application && job) {
    if (searchParams.get("profileMode") === "edit") {
      return { type: "candidate-profile.form", application, job };
    }

    return { type: "applications.detail", application, job };
  }

  return { type: "applications.list" };
}

export function getDashboardTabs(activeNav: string) {
  return activeNav === "jobs" ? jobTabs : applicationTabs;
}

export function getDefaultTab(activeNav: string) {
  return activeNav === "jobs" ? defaultJobTab : defaultApplicationTab;
}
