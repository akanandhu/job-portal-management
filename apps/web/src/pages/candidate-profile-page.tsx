import { BrandLogo } from "@/components/brand/brand-logo";
import { CandidateProfileForm } from "@/features/profile/components/candidate-profile-form";

const CandidateProfilePage = () => {
  return (
    <main className="min-h-svh flex items-center justify-center bg-muted/30 px-6 py-10 text-foreground">
      <div className="mx-auto  w-full max-w-4xl">
        <div className="mb-8 flex justify-center">
          <BrandLogo />
        </div>
        <CandidateProfileForm mode="create" />
      </div>
    </main>
  );
};

export default CandidateProfilePage;
