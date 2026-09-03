import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CandidateProfileForm } from "@/features/profile/components/candidate-profile-form";
import type { CandidateProfileEditorPropsI } from "@/types/profile";

export function CandidateProfileEditor({ job, onBack }: CandidateProfileEditorPropsI) {
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

      <CandidateProfileForm mode="edit" onCancel={onBack} />
    </div>
  );
}
