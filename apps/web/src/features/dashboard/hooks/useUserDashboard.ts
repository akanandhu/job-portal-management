import { BriefcaseBusiness, ClipboardList, UserRoundPen } from "lucide-react";
import toast from "react-hot-toast";

import { useAppSelector } from "@/app/hook";
import {
  useApplyToJobMutation,
  useListMyApplicationsQuery,
} from "@/features/applications/store/applications-api";
import {
  selectHasAppliedToJob,
  selectMyApplications,
} from "@/features/applications/store/applications-slice";
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
  const { error: jobsError, isLoading: isJobsLoading } = useListJobsQuery();
  const jobs = useAppSelector(selectJobs);

  useListMyApplicationsQuery(undefined, { skip: !isCandidate });
  const [applyToJob, { isLoading: isApplying }] = useApplyToJobMutation();

  const myApplications = useAppSelector(selectMyApplications);

  const formattedApplications: AdminApplicationI[] = myApplications.map((app) => ({
    id: app.id,
    jobId: app.jobId,
    candidate: currentUser?.name ?? "Candidate",
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
  }));

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

  const currentJobId = view.type === "jobs.detail" ? view.job.id : undefined;
  const hasApplied = useAppSelector((state) => selectHasAppliedToJob(state, currentJobId));

  const handleApply = async (jobId: string) => {
    try {
      const response = await applyToJob({ jobId }).unwrap();
      toast.success(response.message || "Application submitted successfully!");
    } catch (error: unknown) {
      const message = getApiErrorMessage(error, "Failed to submit application");
      toast.error(message);
    }
  };

  return {
    accountInitial: getNameInitial(currentUser?.name),
    accountName: currentUser?.name ?? "Guest",
    accountSubtitle: isCandidate ? "Candidate" : isAuthenticated ? "" : "Login to apply for jobs",
    activeNav: dashboard.activeNav,
    activeTab: dashboard.activeTab,
    applications: filteredApplications,
    currentTabs: dashboard.currentTabs,
    handleApply,
    handleBackToApplications: () => dashboard.handleNavChange("applications"),
    handleBackToJobs: () => dashboard.handleNavChange("jobs"),
    handleLogout: dashboard.handleLogout,
    handleNavChange: dashboard.handleNavChange,
    handleTabChange: dashboard.handleTabChange,
    handleViewApplication: dashboard.handleViewApplication,
    handleViewJob: (jobId: string) => dashboard.handleViewJob(jobId, defaultJobTab),
    hasApplied,
    isApplying,
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
