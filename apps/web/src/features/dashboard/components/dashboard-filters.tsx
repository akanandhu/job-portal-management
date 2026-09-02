import { useState } from "react";

import { Button } from "@/components/ui/button";
import { MultiTextInput } from "@/components/ui/multi-text-input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  experienceLevels,
  jobCategories,
  jobStatuses,
  workplaceTypes,
} from "@job-portal/contracts/jobs";
import { applicationStatuses } from "@job-portal/contracts/applications";

type FilterSelectPropsI = {
  label: string;
  onValueChange: (value: string) => void;
  options: readonly string[];
  placeholder: string;
  value: string;
};

type DashboardFiltersPropsI = {
  section: string;
};

const emptyValue = "all";

const formatOptionLabel = (value: string) =>
  value
    .toLowerCase()
    .split("_")
    .map((part) => part.slice(0, 1).toUpperCase() + part.slice(1))
    .join(" ");

function FilterSelect({
  label,
  onValueChange,
  options,
  placeholder,
  value,
}: FilterSelectPropsI) {
  return (
    <div className="grid gap-2 text-sm font-semibold">
      {label}
      <Select
        value={value}
        onValueChange={(nextValue) => onValueChange(String(nextValue))}
      >
        <SelectTrigger className="h-10 w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={emptyValue}>All</SelectItem>
          {options.map((option) => (
            <SelectItem key={option} value={option}>
              {formatOptionLabel(option)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export function DashboardFilters({ section }: DashboardFiltersPropsI) {
  const [category, setCategory] = useState(emptyValue);
  const [workplaceType, setWorkplaceType] = useState(emptyValue);
  const [experienceLevel, setExperienceLevel] = useState(emptyValue);
  const [jobStatus, setJobStatus] = useState(emptyValue);
  const [applicationStatus, setApplicationStatus] = useState(emptyValue);
  const [skills, setSkills] = useState<string[]>([]);
  const isJobsSection = section === "jobs";

  const clearFilters = () => {
    setCategory(emptyValue);
    setWorkplaceType(emptyValue);
    setExperienceLevel(emptyValue);
    setJobStatus(emptyValue);
    setApplicationStatus(emptyValue);
    setSkills([]);
  };

  return (
    <div className="grid gap-7">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-lg font-semibold">Filters</h2>
        <Button type="button" variant="outline" size="sm" onClick={clearFilters}>
          Clear
        </Button>
      </div>

      {isJobsSection ? (
        <>
          <FilterSelect
            label="Category"
            options={jobCategories}
            placeholder="All categories"
            value={category}
            onValueChange={setCategory}
          />
          <FilterSelect
            label="Workplace"
            options={workplaceTypes}
            placeholder="All workplace types"
            value={workplaceType}
            onValueChange={setWorkplaceType}
          />
          <FilterSelect
            label="Experience"
            options={experienceLevels}
            placeholder="All levels"
            value={experienceLevel}
            onValueChange={setExperienceLevel}
          />
          <FilterSelect
            label="Status"
            options={jobStatuses}
            placeholder="All statuses"
            value={jobStatus}
            onValueChange={setJobStatus}
          />
        </>
      ) : (
        <FilterSelect
          label="Application status"
          options={applicationStatuses}
          placeholder="All statuses"
          value={applicationStatus}
          onValueChange={setApplicationStatus}
        />
      )}

      <div className="grid gap-2 text-sm font-semibold">
        Skills
        <MultiTextInput
          value={skills}
          placeholder="React"
          onValueChange={setSkills}
        />
      </div>
    </div>
  );
}
