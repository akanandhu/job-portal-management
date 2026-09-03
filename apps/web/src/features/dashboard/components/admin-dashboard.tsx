import { Navigate } from "react-router";
import { AdminDashboardContent } from "@/features/dashboard/components/admin-dashboard-content";
import { DashboardFilters } from "@/features/dashboard/components/dashboard-filters";
import { DashboardShell } from "@/features/dashboard/components/dashboard-shell";
import { DashboardTabs } from "@/features/dashboard/components/dashboard-tabs";
import useAdminDashboard from "../hooks/useAdminDashboard";

export function AdminDashboard() {
  const {
    accountInitial,
    accountName,
    accountSubtitle,
    activeNav,
    activeTab,
    applications,
    hasValidParams,
    searchParams,
    view,
    currentTabs,
    handleAddJob,
    handleBackToApplications,
    handleBackToJobs,
    handleChangeApplicationStatus,
    handleEditJob,
    handleJobSaved,
    handleLogout,
    handleNavChange,
    handleTabChange,
    navItems,
    handleViewApplication,
    handleViewJob,
    hasMoreApplications,
    hasMoreJobs,
    isApplicationsFetching,
    isApplicationsLoading,
    isJobsFetching,
    isJobsLoading,
    jobsErrorMessage,
    jobs,
    onLoadMoreApplications,
    onLoadMoreJobs,
  } = useAdminDashboard();
  const visibleApplications =
    activeNav === "applications"
      ? applications.filter((application) => application.status === activeTab)
      : applications;

  if (!hasValidParams) {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.set("section", activeNav);
    nextParams.set("tab", activeTab);

    return <Navigate to={`/dashboard?${nextParams.toString()}`} replace />;
  }

  return (
    <DashboardShell
      accountInitial={accountInitial}
      accountName={accountName}
      accountSubtitle={accountSubtitle}
      activeNav={activeNav}
      filters={<DashboardFilters section={activeNav} />}
      navItems={navItems}
      onLogout={handleLogout}
      onNavChange={handleNavChange}
      showFilters={view.type.endsWith(".list")}
    >
      <DashboardTabs activeTab={activeTab} tabs={currentTabs} onTabChange={handleTabChange} />
      <AdminDashboardContent
        applications={visibleApplications}
        hasMoreApplications={hasMoreApplications}
        hasMoreJobs={hasMoreJobs}
        isApplicationsFetching={isApplicationsFetching}
        isApplicationsLoading={isApplicationsLoading}
        isJobsFetching={isJobsFetching}
        isJobsLoading={isJobsLoading}
        jobsErrorMessage={jobsErrorMessage}
        jobs={jobs}
        onChangeApplicationStatus={handleChangeApplicationStatus}
        onAddJob={handleAddJob}
        onBackToApplications={handleBackToApplications}
        onBackToJobs={handleBackToJobs}
        onJobSaved={handleJobSaved}
        onEditJob={handleEditJob}
        onLoadMoreApplications={onLoadMoreApplications}
        onLoadMoreJobs={onLoadMoreJobs}
        onViewApplication={handleViewApplication}
        onViewJob={handleViewJob}
        view={view}
      />
    </DashboardShell>
  );
}
