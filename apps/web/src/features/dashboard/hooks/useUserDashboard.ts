import { BriefcaseBusiness, ClipboardList, UserRoundPen } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router";

import { useAppSelector } from "@/app/hook";
import { useLogoutMutation } from "@/features/auth/store/auth-api";
import {
  selectCurrentUser,
  selectIsAuthenticated,
  selectIsCandidate,
} from "@/features/auth/store/auth-selectors";
import { adminApplications, adminJobs } from "@/features/dashboard/data/dashboard-data";
import {
  applicationTabs,
  defaultApplicationTab,
  hasItem,
} from "@/features/dashboard/utils/admin-dashboard-view";
import { getNameInitial } from "@/lib/utils";
import type { DashboardNavItemI, DashboardTabI } from "@/types/dashboard";
import type { UseUserDashboardResultI, UserDashboardViewI } from "@/types/user-dashboard";

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
  jobs: typeof adminJobs;
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

const getRedirectTo = (searchParams: URLSearchParams, activeNav: string, activeTab: string) => {
  const nextParams = new URLSearchParams(searchParams);
  nextParams.set("section", activeNav);
  nextParams.set("tab", activeTab);
  nextParams.delete("jobId");
  nextParams.delete("applicationId");

  return `/listing?${nextParams.toString()}`;
};

export default function useUserDashboard(): UseUserDashboardResultI {
  const navigate = useNavigate();
  const [logout] = useLogoutMutation();
  const [searchParams, setSearchParams] = useSearchParams();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const isCandidate = useAppSelector(selectIsCandidate);
  const currentUser = useAppSelector(selectCurrentUser);
  const navItems: DashboardNavItemI[] = [
    { id: "jobs", label: "Jobs", icon: BriefcaseBusiness },
    ...(isCandidate
      ? [
          { id: "applications", label: "Applications", icon: ClipboardList },
          { id: "profile", label: "Candidate Profile", icon: UserRoundPen },
        ]
      : []),
  ];
  const sectionParam = searchParams.get("section") ?? defaultSection;
  const activeNav = hasItem(navItems, sectionParam) ? sectionParam : defaultSection;
  const currentTabs = getTabs(activeNav);
  const tabParam = searchParams.get("tab") ?? getDefaultTab(activeNav);
  const activeTab = hasItem(currentTabs, tabParam) ? tabParam : getDefaultTab(activeNav);
  const jobs = adminJobs.filter((job) => job.status === "PUBLISHED");
  const applications =
    activeNav === "applications"
      ? candidateApplications.filter((application) => application.status === activeTab)
      : candidateApplications;
  const view = getView({ activeNav, applications: candidateApplications, jobs, searchParams });
  const hasValidParams = sectionParam === activeNav && tabParam === activeTab;

  const updateParams = (updates: Record<string, string | undefined>) => {
    const nextParams = new URLSearchParams(searchParams);

    for (const [key, value] of Object.entries(updates)) {
      if (value === undefined) {
        nextParams.delete(key);
      } else {
        nextParams.set(key, value);
      }
    }

    setSearchParams(nextParams);
  };

  const handleNavChange = (nextSection: string) => {
    updateParams({
      section: nextSection,
      tab: getDefaultTab(nextSection),
      jobId: undefined,
      applicationId: undefined,
    });
  };

  const handleTabChange = (nextTab: string) => {
    updateParams({
      section: activeNav,
      tab: nextTab,
      jobId: undefined,
      applicationId: undefined,
    });
  };

  const handleBackToJobs = () => handleNavChange("jobs");
  const handleBackToApplications = () => handleNavChange("applications");

  const handleViewJob = (jobId: string) => {
    updateParams({ section: "jobs", tab: defaultJobTab, jobId, applicationId: undefined });
  };

  const handleViewApplication = (applicationId: string) => {
    updateParams({ section: "applications", tab: activeTab, applicationId, jobId: undefined });
  };

  const handleApply = () => undefined;

  const handleLogout = async () => {
    await logout()
      .unwrap()
      .catch(() => undefined)
      .finally(() => {
        navigate("/listing", { replace: true });
      });
  };

  return {
    accountInitial: getNameInitial(currentUser?.name),
    accountName: currentUser?.name ?? "Guest",
    accountSubtitle: isCandidate ? "Candidate" : "Public listing access",
    activeNav,
    activeTab,
    applications,
    currentTabs,
    handleApply,
    handleBackToApplications,
    handleBackToJobs,
    handleLogout,
    handleNavChange,
    handleTabChange,
    handleViewApplication,
    handleViewJob,
    hasValidParams,
    isAuthenticated,
    isCandidate,
    jobs,
    navItems,
    redirectTo: getRedirectTo(searchParams, activeNav, activeTab),
    showFilters: activeNav !== "profile" && view.type.endsWith(".list"),
    view,
  };
}
