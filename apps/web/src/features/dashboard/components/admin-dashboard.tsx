import { Navigate } from "react-router";
import { AdminDashboardContent } from "@/features/dashboard/components/admin-dashboard-content";
import { DashboardFilters } from "@/features/dashboard/components/dashboard-filters";
import { DashboardShell } from "@/features/dashboard/components/dashboard-shell";
import { DashboardTabs } from "@/features/dashboard/components/dashboard-tabs";
import { adminJobs } from "@/features/dashboard/data/dashboard-data";
import useAdminDashboard from "../hooks/useAdminDashboard";

export function AdminDashboard() {
  const {
    activeNav,
    activeTab,
    applications,
    hasValidParams,
    searchParams,
    view,
    currentTabs,
    handleAddJob,
    handleBackToApplicationDetail,
    handleBackToApplications,
    handleBackToJobDetail,
    handleBackToJobs,
    handleChangeApplicationStatus,
    handleEditJob,
    handleLogout,
    handleNavChange,
    handleTabChange,
    navItems,
    handleViewApplication,
    handleViewJob,
  } = useAdminDashboard();

  if (!hasValidParams) {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.set("section", activeNav);
    nextParams.set("tab", activeTab);

    return <Navigate to={`/dashboard?${nextParams.toString()}`} replace />;
  }

  return (
    <DashboardShell
      activeNav={activeNav}
      filters={<DashboardFilters section={activeNav} />}
      navItems={navItems}
      onLogout={handleLogout}
      onNavChange={handleNavChange}
      showFilters={view.type.endsWith(".list")}
    >
      <DashboardTabs activeTab={activeTab} tabs={currentTabs} onTabChange={handleTabChange} />
      <AdminDashboardContent
        applications={applications}
        jobs={adminJobs}
        onChangeApplicationStatus={handleChangeApplicationStatus}
        onAddJob={handleAddJob}
        onBackToApplicationDetail={handleBackToApplicationDetail}
        onBackToApplications={handleBackToApplications}
        onBackToJobDetail={handleBackToJobDetail}
        onBackToJobs={handleBackToJobs}
        onEditJob={handleEditJob}
        onViewApplication={handleViewApplication}
        onViewJob={handleViewJob}
        view={view}
      />
    </DashboardShell>
  );
}
