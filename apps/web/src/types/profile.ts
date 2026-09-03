import type { AdminApplicationI, AdminJobI } from "@/features/dashboard/data/dashboard-data";
import type { CandidateProfileInputI, candidateProfileSchema } from "@job-portal/contracts";
import type z from "zod";

export type CandidateProfileFormValuesI = z.input<typeof candidateProfileSchema>;
export type CandidateProfileFormModeI = "create" | "edit";

export type CandidateProfileFormPropsI = {
  initialValues?: CandidateProfileFormValuesI;
  mode?: CandidateProfileFormModeI;
  onCancel?: () => void;
  onSubmit?: (values: CandidateProfileInputI) => void;
};

export type CandidateProfileEditorPropsI = {
  application?: AdminApplicationI;
  job?: AdminJobI;
  onBack?: () => void;
};
