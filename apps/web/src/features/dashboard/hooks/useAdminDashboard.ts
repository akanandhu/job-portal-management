import { useState } from "react";
import { BriefcaseBusiness, ClipboardList } from "lucide-react";
import toast from "react-hot-toast";

import { useAppSelector } from "@/app/hook";
import {
  useListAllApplicationsQuery,
  useUpdateApplicationStatusMutation,
} from "@/features/applications/store/applications-api";
import { selectAllApplications } from "@/features/applications/store/applications-slice";
import { selectCurrentUser } from "@/features/auth/store/auth-selectors";
import type { AdminApplicationI } from "@/features/dashboard/data/dashboard-data";
import { useListJobsQuery } from "@/features/jobs/store/jobs-api";
import { selectJobs } from "@/features/jobs/store/jobs-slice";
import { getNameInitial } from "@/lib/utils";
import { getApiErrorMessage } from "@/services/api-error";
import type { ApplicationStatusI } from "@job-portal/contracts";
import type { DashboardNavItemI } from "@/types/dashboard";
import {
  defaultJobTab,
  defaultSection,
  getAdminDashboardView,
  getDashboardTabs,
  getDefaultTab,
} from "../utils/admin-dashboard-view";
import { useDashboard } from "./useDashboard";

const navItems: DashboardNavItemI[] = [
  { id: "jobs", label: "Jobs", icon: BriefcaseBusiness },
  { id: "applications", label: "Applications", icon: ClipboardList },
];

const useAdminDashboard = () => {
  const [jobsPage, setJobsPage] = useState(1);
  const [applicationsPage, setApplicationsPage] = useState(1);

  const {
    data: jobsResponse,
    error: jobsError,
    isLoading: isJobsLoading,
    isFetching: isJobsFetching,
  } = useListJobsQuery({ status: "all", page: jobsPage });
  const jobs = useAppSelector(selectJobs);

  const {
    data: applicationsResponse,
    isLoading: isApplicationsLoading,
    isFetching: isApplicationsFetching,
  } = useListAllApplicationsQuery({ page: applicationsPage });
  const [updateApplicationStatus] = useUpdateApplicationStatusMutation();

  const allApplications = useAppSelector(selectAllApplications);

  const formattedApplications: AdminApplicationI[] = allApplications.map((app) => ({
    id: app.id,
    jobId: app.jobId,
    candidate: app.user?.name ?? "Candidate",
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

  const currentUser = useAppSelector(selectCurrentUser);
  const dashboard = useDashboard({
    defaultSection,
    getDefaultTab,
    getTabs: getDashboardTabs,
    navItems,
  });

  const view = getAdminDashboardView({
    activeNav: dashboard.activeNav,
    applications: formattedApplications,
    jobs,
    searchParams: dashboard.searchParams,
  });

  const handleAddJob = () => {
    dashboard.updateParams({
      section: "jobs",
      tab: defaultJobTab,
      mode: "add",
      jobId: undefined,
      applicationId: undefined,
    });
  };

  const handleEditJob = (jobId: string) => {
    dashboard.updateParams({
      section: "jobs",
      tab: defaultJobTab,
      mode: "edit",
      jobId,
      applicationId: undefined,
    });
  };

  const handleChangeApplicationStatus = async (
    applicationId: string,
    status: ApplicationStatusI,
  ) => {
    try {
      await updateApplicationStatus({ id: applicationId, status }).unwrap();
      toast.success(`Application status updated to ${status}`);
    } catch (err: unknown) {
      toast.error(getApiErrorMessage(err, "Failed to update application status"));
    }
  };

  const handleJobSaved = () => {
    dashboard.handleBackToJobs(defaultJobTab);
  };

  const jobsMeta = jobsResponse?.meta;
  const hasMoreJobs = Boolean(jobsMeta && jobsMeta.page < jobsMeta.totalPages);

  const applicationsMeta = applicationsResponse?.meta;
  const hasMoreApplications = Boolean(
    applicationsMeta && applicationsMeta.page < applicationsMeta.totalPages,
  );

  return {
    accountInitial: getNameInitial(currentUser?.name, "A"),
    accountName: currentUser?.name ?? "Admin",
    accountSubtitle: "Admin",
    activeNav: dashboard.activeNav,
    activeTab: dashboard.activeTab,
    applications: formattedApplications,
    currentTabs: dashboard.currentTabs,
    handleAddJob,
    handleBackToApplicationDetail: dashboard.handleViewApplication,
    handleBackToApplications: dashboard.handleBackToApplications,
    handleBackToJobDetail: dashboard.handleViewJob,
    handleBackToJobs: dashboard.handleBackToJobs,
    handleChangeApplicationStatus,
    handleEditJob,
    handleJobSaved,
    handleLogout: dashboard.handleLogout,
    handleNavChange: dashboard.handleNavChange,
    handleTabChange: dashboard.handleTabChange,
    handleViewApplication: dashboard.handleViewApplication,
    handleViewJob: dashboard.handleViewJob,
    hasValidParams: dashboard.hasValidParams,
    isJobsLoading,
    isJobsFetching,
    hasMoreJobs,
    onLoadMoreJobs: () => setJobsPage((prev) => prev + 1),
    isApplicationsLoading,
    isApplicationsFetching,
    hasMoreApplications,
    onLoadMoreApplications: () => setApplicationsPage((prev) => prev + 1),
    jobsErrorMessage: jobsError ? getApiErrorMessage(jobsError, "Failed to load jobs") : undefined,
    jobs,
    view,
    navItems,
    updateParams: dashboard.updateParams,
    searchParams: dashboard.searchParams,
  };
};

export default useAdminDashboard;
