import { zodResolver } from "@hookform/resolvers/zod";
import {
  createJobSchema,
  experienceLevels,
  jobCategories,
  jobStatuses,
  workplaceTypes,
} from "@job-portal/contracts/jobs";
import type { CreateJobInputI } from "@job-portal/contracts/jobs";
import { ArrowLeft } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import type { z } from "zod";

import { Button } from "@/components/ui/button";
import ErrorBox from "@/components/ui/error-box";
import { Input } from "@/components/ui/input";
import { MultiTextInput } from "@/components/ui/multi-text-input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { AdminJobI } from "@/features/dashboard/data/dashboard-data";
import { useCreateJobMutation } from "@/features/jobs/store/jobs-api";
import { cn, formatOptionLabel } from "@/lib/utils";
import { getApiErrorMessage } from "@/services/api-error";
import type { JobFormPropsI, JobSelectPropsI } from "@/types/jobs";

export type JobFormValuesI = z.input<typeof createJobSchema>;

const defaultValues: JobFormValuesI = {
  title: "",
  description: "",
  company: "",
  location: "",
  workplaceType: "ON_SITE",
  category: "ENGINEERING",
  experienceLevel: "ENTRY",
  skills: [],
  status: "DRAFT",
  isFeatured: false,
};

function getJobFormValues(job?: AdminJobI): JobFormValuesI {
  return job ?? defaultValues;
}

function JobSelect({
  error,
  label,
  onBlur,
  onValueChange,
  options,
  placeholder,
  value,
}: JobSelectPropsI) {
  return (
    <label className="grid gap-2 text-sm font-medium">
      {label}
      <Select value={value} onValueChange={(nextValue) => onValueChange(String(nextValue))}>
        <SelectTrigger className="h-9 w-full" aria-invalid={Boolean(error)} onBlur={onBlur}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option} value={option} displayValue={formatOptionLabel(option)}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <ErrorBox message={error} />
    </label>
  );
}

export function JobForm({ job, mode, onCancel, onCreated }: JobFormPropsI) {
  const [createJob, { isLoading: isCreating }] = useCreateJobMutation();
  const {
    control,
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<JobFormValuesI, unknown, CreateJobInputI>({
    defaultValues: getJobFormValues(job),
    resolver: zodResolver(createJobSchema),
  });

  const onSubmit = async (values: CreateJobInputI) => {
    if (mode !== "add") {
      const message = "Job updates are not connected yet.";
      toast.error(message);
      setError("root", { type: "server", message });
      return;
    }

    try {
      const result = await createJob(values).unwrap();

      toast.success("Job opening created.");
      onCreated?.(result.data);
    } catch (error) {
      const message = getApiErrorMessage(error, "Failed to create job opening");

      setError("root", {
        type: "server",
        message,
      });
      toast.error(message);
    }
  };
  const title = mode === "add" ? "Add job" : "Edit job";
  const submitLabel = mode === "add" ? "Create job" : "Save changes";

  return (
    <div className="py-5">
      <div className="border-b pb-5">
        <Button type="button" variant="ghost" className="-ml-2 mb-3 w-fit" onClick={onCancel}>
          <ArrowLeft className="size-4" />
          All jobs
        </Button>
        <h1 className="text-2xl font-semibold leading-tight">{title}</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {mode === "add"
            ? "Create a job post using the same fields required by the API."
            : "Update the job post details before publishing changes."}
        </p>
      </div>

      <form className="grid gap-6 py-6" onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="grid gap-5 md:grid-cols-2">
          <label className="grid gap-2 text-sm font-medium" htmlFor="title">
            Job title
            <Input
              id="title"
              placeholder="Software Engineer"
              aria-invalid={Boolean(errors.title)}
              {...register("title")}
            />
            <ErrorBox message={errors.title?.message} />
          </label>

          <label className="grid gap-2 text-sm font-medium" htmlFor="company">
            Company
            <Input
              id="company"
              placeholder="TNP Technologies"
              aria-invalid={Boolean(errors.company)}
              {...register("company")}
            />
            <ErrorBox message={errors.company?.message} />
          </label>

          <label className="grid gap-2 text-sm font-medium" htmlFor="location">
            Location
            <Input
              id="location"
              placeholder="Bengaluru, India"
              aria-invalid={Boolean(errors.location)}
              {...register("location")}
            />
            <ErrorBox message={errors.location?.message} />
          </label>

          <Controller
            control={control}
            name="category"
            render={({ field }) => (
              <JobSelect
                label="Category"
                options={jobCategories}
                placeholder="Select category"
                value={field.value}
                error={errors.category?.message}
                onBlur={field.onBlur}
                onValueChange={field.onChange}
              />
            )}
          />

          <Controller
            control={control}
            name="workplaceType"
            render={({ field }) => (
              <JobSelect
                label="Workplace"
                options={workplaceTypes}
                placeholder="Select workplace"
                value={field.value}
                error={errors.workplaceType?.message}
                onBlur={field.onBlur}
                onValueChange={field.onChange}
              />
            )}
          />

          <Controller
            control={control}
            name="experienceLevel"
            render={({ field }) => (
              <JobSelect
                label="Experience"
                options={experienceLevels}
                placeholder="Select experience"
                value={field.value}
                error={errors.experienceLevel?.message}
                onBlur={field.onBlur}
                onValueChange={field.onChange}
              />
            )}
          />

          <Controller
            control={control}
            name="status"
            render={({ field }) => (
              <JobSelect
                label="Status"
                options={jobStatuses}
                placeholder="Select status"
                value={field.value}
                error={errors.status?.message}
                onBlur={field.onBlur}
                onValueChange={field.onChange}
              />
            )}
          />

          <label className="flex items-center gap-3 pt-7 text-sm font-medium">
            <input
              type="checkbox"
              className="size-5 rounded border border-input accent-primary"
              {...register("isFeatured")}
            />
            Featured job
          </label>
        </div>

        <label className="grid gap-2 text-sm font-medium" htmlFor="description">
          Description
          <textarea
            id="description"
            rows={6}
            placeholder="Describe the responsibilities, expectations, and hiring context."
            className={cn(
              "w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20",
            )}
            aria-invalid={Boolean(errors.description)}
            {...register("description")}
          />
          <ErrorBox message={errors.description?.message} />
        </label>

        <div className="grid gap-2 text-sm font-medium">
          Skills
          <Controller
            control={control}
            name="skills"
            render={({ field }) => (
              <MultiTextInput
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

        <ErrorBox message={errors.root?.message} />

        <div className="flex flex-col gap-3 border-t pt-6 sm:flex-row sm:justify-end">
          <Button
            type="button"
            variant="outline"
            size="lg"
            onClick={onCancel}
            disabled={isCreating}
          >
            Cancel
          </Button>
          <Button type="submit" size="lg" disabled={isCreating}>
            {isCreating ? "Creating..." : submitLabel}
          </Button>
        </div>
      </form>
    </div>
  );
}
