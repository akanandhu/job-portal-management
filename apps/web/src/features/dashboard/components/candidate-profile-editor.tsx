import { ArrowLeft } from "lucide-react";
import type { CandidateProfileInputI } from "@job-portal/contracts/profile";

import { Button } from "@/components/ui/button";
import { CandidateProfileForm } from "@/features/profile/components/candidate-profile-form";
import type { AdminApplicationI } from "@/features/dashboard/data/dashboard-data";
import type { CandidateProfileEditorPropsI } from "@/types/profile";

const getInitialValues = (application: AdminApplicationI): CandidateProfileInputI => ({
  phone: application.phone,
  education: application.education,
  yearsOfExperience: application.yearsOfExperience,
  currentCompany: application.currentCompany,
  currentRole: application.currentRole,
  expectedSalary: application.expectedSalary,
  noticePeriodDays: application.noticePeriodDays,
  skills: [...application.skills],
});

export function CandidateProfileEditor({ application, job, onBack }: CandidateProfileEditorPropsI) {
  return (
    <div className="py-5">
      {onBack ? (
        <Button type="button" variant="ghost" className="-ml-2 mb-3 w-fit" onClick={onBack}>
          <ArrowLeft className="size-4" />
          {job ? "Job detail" : "Dashboard"}
        </Button>
      ) : null}

      <div className="mb-5">
        <h1 className="text-2xl font-semibold leading-tight">Candidate profile</h1>
        {job ? (
          <p className="mt-1 text-sm text-muted-foreground">
            Update your profile before applying to {job.title} at {job.company}.
          </p>
        ) : (
          <p className="mt-1 text-sm text-muted-foreground">
            Keep your candidate profile ready for job applications.
          </p>
        )}
      </div>

      <CandidateProfileForm
        initialValues={application ? getInitialValues(application) : undefined}
        mode="edit"
        onCancel={onBack}
      />
    </div>
  );
}
