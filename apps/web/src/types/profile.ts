import type { AdminJobI } from "@/features/dashboard/data/dashboard-data";
import type { CandidateProfileInputI, candidateProfileSchema } from "@job-portal/contracts";
import type z from "zod";

export type CandidateProfileFormValuesI = z.input<typeof candidateProfileSchema>;
export type CandidateProfileFormModeI = "create" | "edit";

export type CandidateProfileFormPropsI = {
  initialValues?: CandidateProfileFormValuesI;
  isSubmitting?: boolean;
  mode?: CandidateProfileFormModeI;
  onCancel?: () => void;
  onSubmit?: (values: CandidateProfileInputI) => Promise<void> | void;
  submitError?: string;
};

export type CandidateProfileEditorPropsI = {
  job?: AdminJobI;
  onBack?: () => void;
};

export type CandidateProfileI = CandidateProfileInputI & {
  id: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
};

export type CandidateProfileResponseI = {
  data: CandidateProfileI | null;
};
