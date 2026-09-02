
import { BrandLogo } from "@/components/brand/brand-logo";
import LoginForm from "@/features/auth/components/login-form";

const LoginPage = () => {

  return (
    <main className="flex min-h-svh items-center justify-center bg-muted/30 px-6 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 flex justify-center">
          <BrandLogo />
        </div>
        <LoginForm />
      </div>
    </main>
  );
};

export default LoginPage;
