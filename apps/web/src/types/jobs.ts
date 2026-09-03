import type { AdminApplicationI, AdminJobI } from "@/features/dashboard/data/dashboard-data";
import type { ApplicationStatusI } from "@job-portal/contracts";

export type JobFormPropsI = {
  job?: AdminJobI;
  mode: "add" | "edit";
  onCancel: () => void;
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
  applications: AdminApplicationI[];
  applyHref?: string;
  applyLabel?: string;
  backLabel?: string;
  job: AdminJobI;
  onBack: () => void;
  onApply?: (jobId: string) => void;
  onChangeApplicationStatus?: (applicationId: string, status: ApplicationStatusI) => void;
  onEdit?: (jobId: string) => void;
  onViewApplication?: (applicationId: string) => void;
  showApplications?: boolean;
  isLoading?: boolean;
};
