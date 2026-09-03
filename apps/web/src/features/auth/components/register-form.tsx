import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ErrorBox from "@/components/ui/error-box";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { useRegisterMutation } from "@/features/auth/store/auth-api";
import { getApiErrorMessage } from "@/services/api-error";
import type { RegisterFormI } from "@/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerFormSchema } from "@job-portal/contracts";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";

const RegisterUserForm = () => {
  const navigate = useNavigate();
  const [registerUser, { isLoading }] = useRegisterMutation();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<RegisterFormI>({
    resolver: zodResolver(registerFormSchema),
  });

  const onSubmit = async (values: RegisterFormI) => {
    try {
      await registerUser({
        name: values.name,
        email: values.email,
        password: values.password,
      }).unwrap();
      navigate("/profile", { replace: true });
    } catch (error) {
      setError("root", {
        type: "server",
        message: getApiErrorMessage(
          error,
          "Registration failed. Check your details and try again.",
        ),
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create your account</CardTitle>
        <CardDescription>Register as a candidate to apply for jobs.</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid gap-5" onSubmit={handleSubmit(onSubmit)} noValidate>
          <label className="grid gap-2 text-sm font-medium" htmlFor="name">
            Full name
            <Input
              id="name"
              autoComplete="name"
              placeholder="Your name"
              aria-invalid={Boolean(errors.name)}
              {...register("name")}
            />
            <ErrorBox message={errors.name?.message} />
          </label>

          <label className="grid gap-2 text-sm font-medium" htmlFor="email">
            Email
            <Input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              aria-invalid={Boolean(errors.email)}
              {...register("email")}
            />
            <ErrorBox message={errors.email?.message} />
          </label>

          <label className="grid gap-2 text-sm font-medium" htmlFor="password">
            Password
            <PasswordInput
              id="password"
              autoComplete="new-password"
              placeholder="Create a password"
              aria-invalid={Boolean(errors.password)}
              {...register("password")}
            />
            <ErrorBox message={errors.password?.message} />
          </label>

          <label className="grid gap-2 text-sm font-medium" htmlFor="confirmPassword">
            Confirm password
            <PasswordInput
              id="confirmPassword"
              autoComplete="new-password"
              placeholder="Repeat your password"
              aria-invalid={Boolean(errors.confirmPassword)}
              {...register("confirmPassword")}
            />
            <ErrorBox message={errors.confirmPassword?.message} />
          </label>

          <Button type="submit" size="lg" className="mt-1 w-full" disabled={isLoading}>
            {isLoading ? "Creating account..." : "Create account"}
          </Button>
          <ErrorBox message={errors.root?.message} />
        </form>
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link className="font-medium text-foreground underline underline-offset-4" to="/login">
            Sign in
          </Link>
        </p>
      </CardContent>
    </Card>
  );
};

export default RegisterUserForm;
