import type { AdminApplicationI, AdminJobI } from "@/features/dashboard/data/dashboard-data";
import type { DashboardNavItemI, DashboardTabI } from "@/types/dashboard";

export type UserDashboardViewI =
  | { type: "jobs.list" }
  | { type: "jobs.detail"; job: AdminJobI }
  | { type: "applications.list" }
  | { type: "applications.detail"; application: AdminApplicationI; job: AdminJobI }
  | { type: "candidate-profile.form"; application?: AdminApplicationI };

export type UserDashboardContentPropsI = {
  activeTab: string;
  applications: AdminApplicationI[];
  hasApplied?: boolean;
  isApplying?: boolean;
  isJobsLoading?: boolean;
  jobsErrorMessage?: string;
  isCandidate: boolean;
  isAuthenticated: boolean;
  jobs: AdminJobI[];
  onApply: (jobId: string) => void;
  onBackToApplications: () => void;
  onBackToJobs: () => void;
  onNavChange: (value: string) => void;
  onViewApplication: (applicationId: string) => void;
  onViewJob: (jobId: string) => void;
  view: UserDashboardViewI;
};

export type UseUserDashboardResultI = {
  accountInitial: string;
  accountName: string;
  accountSubtitle: string;
  activeNav: string;
  activeTab: string;
  applications: AdminApplicationI[];
  currentTabs: DashboardTabI[];
  handleApply: (jobId: string) => void;
  handleBackToApplications: () => void;
  handleBackToJobs: () => void;
  handleLogout: () => Promise<void>;
  handleNavChange: (value: string) => void;
  handleTabChange: (value: string) => void;
  handleViewApplication: (applicationId: string) => void;
  handleViewJob: (jobId: string) => void;
  hasApplied?: boolean;
  isApplying?: boolean;
  hasValidParams: boolean;
  isAuthenticated: boolean;
  isCandidate: boolean;
  isJobsLoading: boolean;
  jobsErrorMessage?: string;
  jobs: AdminJobI[];
  navItems: DashboardNavItemI[];
  redirectTo: string;
  showFilters: boolean;
  view: UserDashboardViewI;
};
