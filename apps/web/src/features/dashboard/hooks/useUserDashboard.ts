import { BriefcaseBusiness, ClipboardList, UserRoundPen } from "lucide-react";

import { useAppSelector } from "@/app/hook";
import { selectMyApplications } from "@/features/applications/store/applications-slice";
import { formatApplications } from "@/features/applications/utils/format-application";
import {
  selectCurrentUser,
  selectIsAuthenticated,
  selectIsCandidate,
} from "@/features/auth/store/auth-selectors";
import type { AdminApplicationI, AdminJobI } from "@/features/dashboard/data/dashboard-data";
import {
  applicationTabs,
  defaultApplicationTab,
} from "@/features/dashboard/utils/admin-dashboard-view";
import { selectJobs } from "@/features/jobs/store/jobs-slice";
import { getNameInitial } from "@/lib/utils";
import type { DashboardNavItemI, DashboardTabI } from "@/types/dashboard";
import type { UseUserDashboardResultI, UserDashboardViewI } from "@/types/user-dashboard";
import { useDashboard } from "./useDashboard";

const defaultSection = "jobs";
const defaultJobTab = "suggested-jobs";
const defaultProfileTab = "candidate-profile";

const jobTabs: DashboardTabI[] = [{ id: defaultJobTab, label: "Suggested Jobs" }];
const profileTabs: DashboardTabI[] = [{ id: defaultProfileTab, label: "Candidate Profile" }];

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
  applications: AdminApplicationI[];
  jobs: AdminJobI[];
  searchParams: URLSearchParams;
}): UserDashboardViewI => {
  if (activeNav === "jobs") {
    const job = jobs.find((item) => item.id === searchParams.get("jobId"));
    return job ? { type: "jobs.detail", job } : { type: "jobs.list" };
  }

  if (activeNav === "profile") {
    return { type: "candidate-profile.form" };
  }

  const application = applications.find((item) => item.id === searchParams.get("applicationId"));
  const job = jobs.find((item) => item.id === application?.jobId);

  return application && job
    ? {
        type: "applications.detail",
        application,
        job,
      }
    : { type: "applications.list" };
};

export default function useUserDashboard(): UseUserDashboardResultI {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const isCandidate = useAppSelector(selectIsCandidate);
  const currentUser = useAppSelector(selectCurrentUser);
  const jobs = useAppSelector(selectJobs);
  const myApplications = useAppSelector(selectMyApplications);

  const formattedApplications: AdminApplicationI[] = formatApplications(
    myApplications,
    currentUser?.name ?? "Candidate",
  );

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

  const filteredApplications =
    dashboard.activeNav === "applications"
      ? formattedApplications.filter((application) => application.status === dashboard.activeTab)
      : formattedApplications;

  const view = getView({
    activeNav: dashboard.activeNav,
    applications: formattedApplications,
    jobs,
    searchParams: dashboard.searchParams,
  });

  return {
    accountInitial: getNameInitial(currentUser?.name),
    accountName: currentUser?.name ?? "Guest",
    accountSubtitle: isCandidate ? "Candidate" : isAuthenticated ? "" : "Login to apply for jobs",
    activeNav: dashboard.activeNav,
    activeTab: dashboard.activeTab,
    applications: filteredApplications,
    currentTabs: dashboard.currentTabs,
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
    jobs,
    navItems,
    redirectTo: dashboard.getRedirectTo("/listing"),
    showFilters: dashboard.activeNav === "jobs" && view.type.endsWith(".list"),
    view,
  };
}
