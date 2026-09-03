import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { experienceLevels, jobCategories, jobStatuses } from "@job-portal/contracts/jobs";
import { formatOptionLabel } from "@/lib/utils";

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
const applicationExperienceOptions = ["0", "1", "2", "3", "4", "5+"] as const;

function FilterSelect({ label, onValueChange, options, placeholder, value }: FilterSelectPropsI) {
  return (
    <div className="grid gap-2 text-sm font-semibold">
      {label}
      <Select value={value} onValueChange={(nextValue) => onValueChange(String(nextValue))}>
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
  const [experienceLevel, setExperienceLevel] = useState(emptyValue);
  const [jobStatus, setJobStatus] = useState(emptyValue);
  const [applicationExperience, setApplicationExperience] = useState(emptyValue);
  const isJobsSection = section === "jobs";

  const clearFilters = () => {
    setCategory(emptyValue);
    setExperienceLevel(emptyValue);
    setJobStatus(emptyValue);
    setApplicationExperience(emptyValue);
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
          label="Years of experience"
          options={applicationExperienceOptions}
          placeholder="All experience"
          value={applicationExperience}
          onValueChange={setApplicationExperience}
        />
      )}
    </div>
  );
}
