import type { AdminApplicationI, AdminJobI } from "@/features/dashboard/data/dashboard-data";
import type { JobCategoryCountI } from "@/features/jobs/store/jobs-slice";
import type { ApplicationStatusI } from "@job-portal/contracts";
import type { CreateJobInputI, JobStatusI, UpdateJobInputI } from "@job-portal/contracts/jobs";

export type JobResponseDataI = CreateJobInputI & {
  id: string;
  applicationsCount?: number;
  createdAt?: string;
  updatedAt?: string;
};

export type JobFormPropsI = {
  job?: AdminJobI;
  mode: "add" | "edit";
  onCancel: () => void;
  onSaved?: (job: JobResponseDataI) => void;
};

export type JobSelectPropsI = {
  error?: string;
  label: string;
  onBlur: () => void;
  onValueChange: (value: string) => void;
  options: readonly string[];
  placeholder: string;
  value: string | undefined;
};

export type JobDetailPropsI = {
  applications?: AdminApplicationI[];
  applyHref?: string;
  applyLabel?: string;
  backLabel?: string;
  hasApplied?: boolean;
  isApplying?: boolean;
  job: AdminJobI;
  onBack: () => void;
  onApply?: (jobId: string) => void;
  onChangeApplicationStatus?: (applicationId: string, status: ApplicationStatusI) => void;
  onEdit?: (jobId: string) => void;
  onViewApplication?: (applicationId: string) => void;
  showApplications?: boolean;
  isLoading?: boolean;
};

type JobsListResponseMetaI = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type JobsListApiResponseI = {
  data: JobResponseDataI[];
  meta: JobsListResponseMetaI;
};

export type ListJobsQueryI = {
  page?: number;
  limit?: number;
  status?: JobStatusI | "all";
};

export type JobResponseI = {
  data: JobResponseDataI;
};

export type UpdateJobRequestI = {
  id: string;
  data: UpdateJobInputI;
};

export type JobCategoryCountResponseI = {
  data: JobCategoryCountI[];
};

export type FeaturedJobsQueryRequestI = {
  limit?: number;
};

export type FeaturedJobsApiResponseI = {
  data: JobResponseDataI[];
};
