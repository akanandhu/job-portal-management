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
import { MultiTextInput } from "@/components/ui/multi-text-input";
import type { CandidateProfileFormPropsI } from "@/types/profile";
import { Controller } from "react-hook-form";
import useCandidateProfileForm from "../hooks/useCandidateProfileForm";

export function CandidateProfileForm({
  initialValues,
  mode = "create",
  onCancel,
  onSubmit,
}: CandidateProfileFormPropsI) {
  const {
    control,
    errors,
    register,
    handleSubmit,
    handleProfileSubmit,
    onBack,
    emptyToNull
  } = useCandidateProfileForm({
    initialValues,
    onCancel,
    onSubmit,
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {mode === "edit"
            ? "Edit candidate profile"
            : "Complete your candidate profile"}
        </CardTitle>
        <CardDescription>
          {mode === "edit"
            ? "Update the candidate details used for application review."
            : "Add the details recruiters need before you start applying."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          className="grid gap-6"
          onSubmit={handleSubmit(handleProfileSubmit)}
          noValidate
        >
          <div className="grid gap-5 md:grid-cols-2">
            <label className="grid gap-2 text-sm font-medium" htmlFor="phone">
              Phone
              <Input
                id="phone"
                autoComplete="tel"
                placeholder="+91 98765 43210"
                aria-invalid={Boolean(errors.phone)}
                {...register("phone")}
              />
              <ErrorBox message={errors.phone?.message} />
            </label>

            <label
              className="grid gap-2 text-sm font-medium"
              htmlFor="education"
            >
              Highest education
              <Input
                id="education"
                placeholder="B.Tech Computer Science"
                aria-invalid={Boolean(errors.education)}
                {...register("education")}
              />
              <ErrorBox message={errors.education?.message} />
            </label>

            <label
              className="grid gap-2 text-sm font-medium"
              htmlFor="yearsOfExperience"
            >
              Years of experience
              <Input
                id="yearsOfExperience"
                type="number"
                min={0}
                placeholder="0"
                aria-invalid={Boolean(errors.yearsOfExperience)}
                onScroll={(event) => event.currentTarget.blur()}
                onWheel={(event) => event.currentTarget.blur()}
                {...register("yearsOfExperience", { valueAsNumber: true })}
              />
              <ErrorBox message={errors.yearsOfExperience?.message} />
            </label>

            <label
              className="grid gap-2 text-sm font-medium"
              htmlFor="expectedSalary"
            >
              Expected salary
              <Input
                id="expectedSalary"
                type="number"
                min={0}
                placeholder="600000"
                aria-invalid={Boolean(errors.expectedSalary)}
                onScroll={(event) => event.currentTarget.blur()}
                onWheel={(event) => event.currentTarget.blur()}
                {...register("expectedSalary", { valueAsNumber: true })}
              />
              <ErrorBox message={errors.expectedSalary?.message} />
            </label>

            <label
              className="grid gap-2 text-sm font-medium"
              htmlFor="currentCompany"
            >
              Current company
              <Input
                id="currentCompany"
                placeholder="Acme Labs"
                aria-invalid={Boolean(errors.currentCompany)}
                {...register("currentCompany", { setValueAs: emptyToNull })}
              />
              <ErrorBox message={errors.currentCompany?.message} />
            </label>

            <label
              className="grid gap-2 text-sm font-medium"
              htmlFor="currentRole"
            >
              Current role
              <Input
                id="currentRole"
                placeholder="Frontend Developer"
                aria-invalid={Boolean(errors.currentRole)}
                {...register("currentRole", { setValueAs: emptyToNull })}
              />
              <ErrorBox message={errors.currentRole?.message} />
            </label>

            <label
              className="grid gap-2 text-sm font-medium"
              htmlFor="noticePeriodDays"
            >
              Notice period
              <Input
                id="noticePeriodDays"
                type="number"
                min={0}
                placeholder="30"
                aria-invalid={Boolean(errors.noticePeriodDays)}
                onScroll={(event) => event.currentTarget.blur()}
                onWheel={(event) => event.currentTarget.blur()}
                {...register("noticePeriodDays", { valueAsNumber: true })}
              />
              <ErrorBox message={errors.noticePeriodDays?.message} />
            </label>

            <div className="grid gap-2 text-sm font-medium">
              Skills
              <Controller
                control={control}
                name="skills"
                render={({ field }) => (
                  <MultiTextInput
                    id="skills"
                    value={field.value}
                    placeholder="React"
                    aria-invalid={Boolean(errors.skills)}
                    onBlur={field.onBlur}
                    onValueChange={field.onChange}
                  />
                )}
              />
              <ErrorBox message={errors.skills?.message} />
            </div>
          </div>

          <div className="flex flex-col gap-3 border-t pt-6 sm:flex-row sm:justify-end">
            <Button onClick={onBack} type="button" variant="outline" size="lg">
              {mode === "edit" ? "Cancel" : "Back to Register"}
            </Button>
            <Button type="submit" size="lg">
              {mode === "edit" ? "Update profile" : "Save profile"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
