import { BrandLogo } from "@/components/brand/brand-logo";
import { Button } from "@/components/ui/button";
import { CandidateProfileForm } from "@/features/profile/components/candidate-profile-form";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";

const CandidateProfilePage = () => {
  const navigate = useNavigate();

  return (
    <main className="min-h-svh bg-muted/30 px-6 py-10 text-foreground">
      <div className="mx-auto w-full max-w-4xl">
        <div className="mb-8 grid gap-6">
          <Button
            type="button"
            variant="ghost"
            className="w-fit"
            onClick={() => navigate("/register")}
          >
            <ArrowLeft className="size-4" />
            Back to register
          </Button>
        </div>
        <div className="mb-8 flex justify-center">
          <BrandLogo />
        </div>
        <CandidateProfileForm />
      </div>
    </main>
  );
};

export default CandidateProfilePage;
