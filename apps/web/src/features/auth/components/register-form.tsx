import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ErrorBox from "@/components/ui/error-box";
import { Input } from "@/components/ui/input";
import type { RegisterFormI } from "@/types/auth";
import { useForm } from "react-hook-form";
import { Link } from "react-router";

const RegisterUserForm = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<RegisterFormI>();

  const onSubmit = () => undefined;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create your account</CardTitle>
        <CardDescription>
          Register as a candidate to apply for jobs.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          className="grid gap-5"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <label className="grid gap-2 text-sm font-medium" htmlFor="name">
            Full name
            <Input
              id="name"
              autoComplete="name"
              placeholder="Your name"
              aria-invalid={Boolean(errors.name)}
              {...register("name", { required: "Name is required" })}
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
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Enter a valid email",
                },
              })}
            />
            {errors.email && (
              <span className="text-xs text-destructive">
                {errors.email.message}
              </span>
            )}
          </label>

          <label className="grid gap-2 text-sm font-medium" htmlFor="password">
            Password
            <Input
              id="password"
              type="password"
              autoComplete="new-password"
              placeholder="Create a password"
              aria-invalid={Boolean(errors.password)}
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Use at least 6 characters" },
              })}
            />
            {errors.password && (
              <span className="text-xs text-destructive">
                {errors.password.message}
              </span>
            )}
          </label>

          <label
            className="grid gap-2 text-sm font-medium"
            htmlFor="confirmPassword"
          >
            Confirm password
            <Input
              id="confirmPassword"
              type="password"
              autoComplete="new-password"
              placeholder="Repeat your password"
              aria-invalid={Boolean(errors.confirmPassword)}
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === getValues("password") || "Passwords do not match",
              })}
            />
            <ErrorBox message={errors.confirmPassword?.message} />
          </label>

          <Button type="submit" size="lg" className="mt-1 w-full">
            Create account
          </Button>
        </form>
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            className="font-medium text-foreground underline underline-offset-4"
            to="/login"
          >
            Sign in
          </Link>
        </p>
      </CardContent>
    </Card>
  );
};

export default RegisterUserForm;
