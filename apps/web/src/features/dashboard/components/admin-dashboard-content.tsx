import { ApplicationDetail } from "@/features/dashboard/components/application-detail";
import { ApplicationList } from "@/features/dashboard/components/application-list";
import { JobDetail } from "@/features/jobs/components/job-detail";
import { JobForm } from "@/features/jobs/components/job-form";
import { JobList } from "@/features/jobs/components/job-list";
import type { ApplicationStatusI } from "@job-portal/contracts/applications";
import type { AdminApplicationI, AdminJobI } from "@/features/dashboard/data/dashboard-data";
import type { AdminDashboardViewI } from "@/features/dashboard/utils/admin-dashboard-view";
import type { JobFormPropsI } from "@/types/jobs";

type AdminDashboardContentPropsI = {
  applications: AdminApplicationI[];
  hasMoreApplications?: boolean;
  hasMoreJobs?: boolean;
  isApplicationsFetching?: boolean;
  isApplicationsLoading?: boolean;
  isJobsFetching?: boolean;
  isJobsLoading?: boolean;
  jobsErrorMessage?: string;
  jobs: AdminJobI[];
  onAddJob: () => void;
  onBackToApplications: () => void;
  onBackToJobs: () => void;
  onChangeApplicationStatus: (applicationId: string, status: ApplicationStatusI) => void;
  onEditJob: (jobId: string) => void;
  onJobSaved: JobFormPropsI["onSaved"];
  onLoadMoreApplications?: () => void;
  onLoadMoreJobs?: () => void;
  onViewApplication: (applicationId: string) => void;
  onViewJob: (jobId: string) => void;
  view: AdminDashboardViewI;
};

export function AdminDashboardContent({
  applications,
  hasMoreApplications,
  hasMoreJobs,
  isApplicationsFetching = false,
  isApplicationsLoading = false,
  isJobsFetching = false,
  isJobsLoading = false,
  jobsErrorMessage,
  jobs,
  onChangeApplicationStatus,
  onAddJob,
  onBackToApplications,
  onBackToJobs,
  onEditJob,
  onJobSaved,
  onLoadMoreApplications,
  onLoadMoreJobs,
  onViewApplication,
  onViewJob,
  view,
}: AdminDashboardContentPropsI) {
  switch (view.type) {
    case "jobs.detail":
      return (
        <JobDetail
          applications={applications.filter((application) => application.jobId === view.job.id)}
          job={view.job}
          onBack={onBackToJobs}
          onChangeApplicationStatus={onChangeApplicationStatus}
          onEdit={onEditJob}
          onViewApplication={onViewApplication}
        />
      );

    case "jobs.form":
      return (
        <JobForm job={view.job} mode={view.mode} onCancel={onBackToJobs} onSaved={onJobSaved} />
      );

    case "jobs.list":
      return (
        <JobList
          errorMessage={jobsErrorMessage}
          hasMore={hasMoreJobs}
          isFetchingMore={isJobsFetching}
          isLoading={isJobsLoading}
          jobs={jobs}
          onAddJob={onAddJob}
          onEditJob={onEditJob}
          onLoadMore={onLoadMoreJobs}
          onViewJob={onViewJob}
        />
      );

    case "applications.detail":
      return (
        <ApplicationDetail
          application={view.application}
          company={view.job.company}
          jobTitle={view.job.title}
          onChangeStatus={onChangeApplicationStatus}
          onBack={onBackToApplications}
        />
      );

    case "applications.list":
      return (
        <ApplicationList
          applications={applications}
          hasMore={hasMoreApplications}
          isFetchingMore={isApplicationsFetching}
          isLoading={isApplicationsLoading}
          jobs={jobs}
          onChangeApplicationStatus={onChangeApplicationStatus}
          onLoadMore={onLoadMoreApplications}
          onViewApplication={onViewApplication}
        />
      );
  }
}
