import { ApplicationDetail } from "@/features/dashboard/components/application-detail";
import { ApplicationList } from "@/features/dashboard/components/application-list";
import { JobDetail } from "@/features/dashboard/components/job-detail";
import { JobForm } from "@/features/dashboard/components/job-form";
import { JobList } from "@/features/dashboard/components/job-list";
import type { ApplicationStatusI } from "@job-portal/contracts/applications";
import type { AdminApplicationI, AdminJobI } from "@/features/dashboard/data/dashboard-data";
import type { AdminDashboardViewI } from "@/features/dashboard/utils/admin-dashboard-view";
import type { JobFormPropsI } from "@/types/jobs";

type AdminDashboardContentPropsI = {
  applications: AdminApplicationI[];
  jobs: AdminJobI[];
  onChangeApplicationStatus: (applicationId: string, status: ApplicationStatusI) => void;
  onAddJob: () => void;
  onBackToApplications: () => void;
  onBackToJobs: () => void;
  onEditJob: (jobId: string) => void;
  onJobCreated: JobFormPropsI["onCreated"];
  onViewApplication: (applicationId: string) => void;
  onViewJob: (jobId: string) => void;
  view: AdminDashboardViewI;
};

export function AdminDashboardContent({
  applications,
  jobs,
  onChangeApplicationStatus,
  onAddJob,
  onBackToApplications,
  onBackToJobs,
  onEditJob,
  onJobCreated,
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
        <JobForm job={view.job} mode={view.mode} onCancel={onBackToJobs} onCreated={onJobCreated} />
      );

    case "jobs.list":
      return (
        <JobList jobs={jobs} onAddJob={onAddJob} onEditJob={onEditJob} onViewJob={onViewJob} />
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
          jobs={jobs}
          onChangeApplicationStatus={onChangeApplicationStatus}
          onViewApplication={onViewApplication}
        />
      );
  }
}
