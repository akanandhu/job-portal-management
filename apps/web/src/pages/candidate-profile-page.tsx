import { BrandLogo } from "@/components/brand/brand-logo";
import { CandidateProfileForm } from "@/features/profile/components/candidate-profile-form";
import { useSaveCandidateProfileMutation } from "@/features/profile/store/profile-api";
import { getApiErrorMessage } from "@/services/api-error";
import type { CandidateProfileInputI } from "@job-portal/contracts";
import { useState } from "react";
import { useNavigate } from "react-router";

const CandidateProfilePage = () => {
  const navigate = useNavigate();
  const [submitError, setSubmitError] = useState<string>();
  const [saveCandidateProfile, { isLoading }] = useSaveCandidateProfileMutation();

  const handleSubmit = async (values: CandidateProfileInputI) => {
    try {
      setSubmitError(undefined);
      await saveCandidateProfile(values).unwrap();
      navigate("/listing", { replace: true });
    } catch (error) {
      setSubmitError(
        getApiErrorMessage(error, "Failed to save profile. Check your details and try again."),
      );
    }
  };

  const handleCancel = () => {
    navigate("/", { replace: true });
  };

  return (
    <main className="min-h-svh flex items-center justify-center bg-muted/30 px-6 py-10 text-foreground">
      <div className="mx-auto  w-full max-w-4xl">
        <div className="mb-8 flex justify-center">
          <BrandLogo />
        </div>
        <CandidateProfileForm
          isSubmitting={isLoading}
          submitError={submitError}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </div>
    </main>
  );
};

export default CandidateProfilePage;
