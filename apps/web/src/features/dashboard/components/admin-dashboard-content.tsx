import { ApplicationDetail } from "@/features/dashboard/components/application-detail";
import { ApplicationList } from "@/features/dashboard/components/application-list";
import { JobDetail } from "@/features/dashboard/components/job-detail";
import { JobForm } from "@/features/dashboard/components/job-form";
import { JobList } from "@/features/dashboard/components/job-list";
import type {
  AdminApplicationI,
  AdminJobI,
} from "@/features/dashboard/data/dashboard-data";
import type { AdminDashboardViewI } from "@/features/dashboard/utils/admin-dashboard-view";

type AdminDashboardContentPropsI = {
  applications: AdminApplicationI[];
  jobs: AdminJobI[];
  onAddJob: () => void;
  onBackToApplications: () => void;
  onBackToJobs: () => void;
  onEditJob: (jobId: string) => void;
  onViewApplication: (applicationId: string) => void;
  onViewJob: (jobId: string) => void;
  view: AdminDashboardViewI;
};

export function AdminDashboardContent({
  applications,
  jobs,
  onAddJob,
  onBackToApplications,
  onBackToJobs,
  onEditJob,
  onViewApplication,
  onViewJob,
  view,
}: AdminDashboardContentPropsI) {
  switch (view.type) {
    case "jobs.detail":
      return (
        <JobDetail
          applications={applications.filter(
            (application) => application.jobId === view.job.id,
          )}
          job={view.job}
          onBack={onBackToJobs}
          onEdit={onEditJob}
          onViewApplication={onViewApplication}
        />
      );

    case "jobs.form":
      return (
        <JobForm
          job={view.job}
          mode={view.mode}
          onCancel={onBackToJobs}
        />
      );

    case "jobs.list":
      return (
        <JobList
          jobs={jobs}
          onAddJob={onAddJob}
          onEditJob={onEditJob}
          onViewJob={onViewJob}
        />
      );

    case "applications.detail":
      return (
        <ApplicationDetail
          application={view.application}
          company={view.job.company}
          jobTitle={view.job.title}
          onBack={onBackToApplications}
        />
      );

    case "applications.list":
      return (
        <ApplicationList
          applications={applications}
          jobs={jobs}
          onViewApplication={onViewApplication}
        />
      );
  }
}
