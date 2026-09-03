import { ArrowLeft } from "lucide-react";
import type { CandidateProfileInputI } from "@job-portal/contracts/profile";

import { Button } from "@/components/ui/button";
import { CandidateProfileForm } from "@/features/profile/components/candidate-profile-form";
import type { AdminApplicationI } from "@/features/dashboard/data/dashboard-data";
import type { CandidateProfileEditorPropsI } from "@/types/profile";

const getInitialValues = (
  application: AdminApplicationI,
): CandidateProfileInputI => ({
  phone: application.phone,
  education: application.education,
  yearsOfExperience: application.yearsOfExperience,
  currentCompany: application.currentCompany,
  currentRole: application.currentRole,
  expectedSalary: application.expectedSalary,
  noticePeriodDays: application.noticePeriodDays,
  skills: [...application.skills],
});

export function CandidateProfileEditor({
  application,
  job,
  onBack,
}: CandidateProfileEditorPropsI) {
  return (
    <div className="py-5">
      <Button
        type="button"
        variant="ghost"
        className="-ml-2 mb-3 w-fit"
        onClick={onBack}
      >
        <ArrowLeft className="size-4" />
        {application.candidate}
      </Button>

      <div className="mb-5">
        <h1 className="text-2xl font-semibold leading-tight">
          Candidate profile
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {job.title} at {job.company}
        </p>
      </div>

      <CandidateProfileForm
        initialValues={getInitialValues(application)}
        mode="edit"
        onCancel={onBack}
      />
    </div>
  );
}
