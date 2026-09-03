import { BriefcaseBusiness, ClipboardList, UserRoundPen } from "lucide-react";

import { useAppSelector } from "@/app/hook";
import {
  selectCurrentUser,
  selectIsAuthenticated,
  selectIsCandidate,
} from "@/features/auth/store/auth-selectors";
import { adminApplications, type AdminJobI } from "@/features/dashboard/data/dashboard-data";
import {
  applicationTabs,
  defaultApplicationTab,
} from "@/features/dashboard/utils/admin-dashboard-view";
import { useListJobsQuery } from "@/features/jobs/store/jobs-api";
import { selectJobs } from "@/features/jobs/store/jobs-slice";
import { getNameInitial } from "@/lib/utils";
import { getApiErrorMessage } from "@/services/api-error";
import type { DashboardNavItemI, DashboardTabI } from "@/types/dashboard";
import type { UseUserDashboardResultI, UserDashboardViewI } from "@/types/user-dashboard";
import { useDashboard } from "./useDashboard";

const defaultSection = "jobs";
const defaultJobTab = "suggested-jobs";
const defaultProfileTab = "candidate-profile";

const jobTabs: DashboardTabI[] = [{ id: defaultJobTab, label: "Suggested Jobs" }];
const profileTabs: DashboardTabI[] = [{ id: defaultProfileTab, label: "Candidate Profile" }];

const candidateApplications = adminApplications.filter(
  (application) => application.candidate === "Ananthakrishnan",
);

const getDefaultTab = (section: string) =>
  section === "applications"
    ? defaultApplicationTab
    : section === "profile"
      ? defaultProfileTab
      : defaultJobTab;

const getTabs = (section: string) =>
  section === "applications" ? applicationTabs : section === "profile" ? profileTabs : jobTabs;

const getView = ({
  activeNav,
  applications,
  jobs,
  searchParams,
}: {
  activeNav: string;
  applications: typeof candidateApplications;
  jobs: AdminJobI[];
  searchParams: URLSearchParams;
}): UserDashboardViewI => {
  if (activeNav === "jobs") {
    const job = jobs.find((item) => item.id === searchParams.get("jobId"));
    return job ? { type: "jobs.detail", job } : { type: "jobs.list" };
  }

  if (activeNav === "profile") {
    return { type: "candidate-profile.form", application: applications[0] };
  }

  const application = applications.find((item) => item.id === searchParams.get("applicationId"));
  const job = jobs.find((item) => item.id === application?.jobId);

  return application && job
    ? { type: "applications.detail", application, job }
    : { type: "applications.list" };
};

export default function useUserDashboard(): UseUserDashboardResultI {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const isCandidate = useAppSelector(selectIsCandidate);
  const currentUser = useAppSelector(selectCurrentUser);
  const { error: jobsError, isLoading: isJobsLoading } = useListJobsQuery();
  const jobs = useAppSelector(selectJobs);
  const navItems: DashboardNavItemI[] = [
    { id: "jobs", label: "Jobs", icon: BriefcaseBusiness },
    ...(isCandidate
      ? [
          { id: "applications", label: "Applications", icon: ClipboardList },
          { id: "profile", label: "Candidate Profile", icon: UserRoundPen },
        ]
      : []),
  ];
  const dashboard = useDashboard({
    defaultSection,
    getDefaultTab,
    getTabs,
    navItems,
  });
  const applications =
    dashboard.activeNav === "applications"
      ? candidateApplications.filter((application) => application.status === dashboard.activeTab)
      : candidateApplications;
  const view = getView({
    activeNav: dashboard.activeNav,
    applications: candidateApplications,
    jobs,
    searchParams: dashboard.searchParams,
  });

  const handleApply = () => undefined;

  return {
    accountInitial: getNameInitial(currentUser?.name),
    accountName: currentUser?.name ?? "Guest",
    accountSubtitle: isCandidate ? "Candidate" : isAuthenticated ? "" : "Login to apply for jobs",
    activeNav: dashboard.activeNav,
    activeTab: dashboard.activeTab,
    applications,
    currentTabs: dashboard.currentTabs,
    handleApply,
    handleBackToApplications: () => dashboard.handleNavChange("applications"),
    handleBackToJobs: () => dashboard.handleNavChange("jobs"),
    handleLogout: dashboard.handleLogout,
    handleNavChange: dashboard.handleNavChange,
    handleTabChange: dashboard.handleTabChange,
    handleViewApplication: dashboard.handleViewApplication,
    handleViewJob: (jobId: string) => dashboard.handleViewJob(jobId, defaultJobTab),
    hasValidParams: dashboard.hasValidParams,
    isAuthenticated,
    isCandidate,
    isJobsLoading,
    jobsErrorMessage: jobsError
      ? getApiErrorMessage(jobsError, "Failed to load open jobs")
      : undefined,
    jobs,
    navItems,
    redirectTo: dashboard.getRedirectTo("/listing"),
    showFilters: dashboard.activeNav !== "profile" && view.type.endsWith(".list"),
    view,
  };
}
