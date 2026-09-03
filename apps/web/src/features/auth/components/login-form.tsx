import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import ErrorBox from "@/components/ui/error-box";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { useLoginMutation } from "@/features/auth/store/auth-api";
import { getApiErrorMessage } from "@/services/api-error";
import type { LoginFormI } from "@/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@job-portal/contracts";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";

const LoginForm = () => {
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginFormI>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (values: LoginFormI) => {
    try {
      const result = await login(values).unwrap();
      const nextRoute = result.user.role === "ADMIN" ? "/dashboard" : "/listing";

      navigate(nextRoute, { replace: true });
    } catch (error) {
      setError("root", {
        type: "server",
        message: getApiErrorMessage(error, "Invalid email or password"),
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome back</CardTitle>
        <CardDescription>Sign in to continue to your account.</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid gap-5" onSubmit={handleSubmit(onSubmit)} noValidate>
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
              autoComplete="current-password"
              placeholder="Enter your password"
              aria-invalid={Boolean(errors.password)}
              {...register("password")}
            />
            <ErrorBox message={errors.password?.message} />
          </label>

          <Button type="submit" size="lg" className="mt-1 w-full" disabled={isLoading}>
            {isLoading ? "Signing in..." : "Sign in"}
          </Button>
          <ErrorBox message={errors.root?.message} />
        </form>
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link className="font-medium text-foreground underline underline-offset-4" to="/register">
            Create one
          </Link>
        </p>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
