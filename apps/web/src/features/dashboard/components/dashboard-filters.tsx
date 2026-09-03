import { useSearchParams } from "react-router";

import { useAppDispatch, useAppSelector } from "@/app/hook";
import { Button } from "@/components/ui/button";
import { selectIsAdmin } from "@/features/auth/store/auth-selectors";
import {
  clearFilters as clearFiltersAction,
  selectJobFilters,
  setFilter as setFilterAction,
  type JobFilterStateI,
} from "@/features/jobs/store/jobs-slice";
import {
  experienceLevels,
  jobCategories,
  jobStatuses,
  workplaceTypes,
} from "@job-portal/contracts/jobs";
import FilterSelect from "./filter-select";

type DashboardFiltersPropsI = {
  section: string;
};

export const emptyValue = "all";
const applicationExperienceOptions = ["0", "1", "2", "3", "4", "5+"] as const;

export function DashboardFilters({ section }: DashboardFiltersPropsI) {
  const dispatch = useAppDispatch();
  const isAdmin = useAppSelector(selectIsAdmin);
  const reduxFilters = useAppSelector(selectJobFilters);
  const [searchParams, setSearchParams] = useSearchParams();

  const isJobsSection = section === "jobs";

  const category = searchParams.get("category") ?? reduxFilters.category ?? emptyValue;
  const experienceLevel =
    searchParams.get("experienceLevel") ?? reduxFilters.experienceLevel ?? emptyValue;
  const workplaceType =
    searchParams.get("workplaceType") ?? reduxFilters.workplaceType ?? emptyValue;
  const jobStatus = searchParams.get("status") ?? reduxFilters.status ?? emptyValue;
  const applicationExperience =
    searchParams.get("applicationExperience") ?? reduxFilters.applicationExperience ?? emptyValue;

  const handleFilterChange = (key: keyof JobFilterStateI, value: string) => {
    const nextValue = value === emptyValue ? undefined : value;
    dispatch(setFilterAction({ key, value: nextValue }));

    const nextParams = new URLSearchParams(searchParams);
    if (nextValue) {
      nextParams.set(key, nextValue);
    } else {
      nextParams.delete(key);
    }
    setSearchParams(nextParams);
  };

  const handleClearFilters = () => {
    dispatch(clearFiltersAction());

    const nextParams = new URLSearchParams(searchParams);
    nextParams.delete("category");
    nextParams.delete("experienceLevel");
    nextParams.delete("workplaceType");
    nextParams.delete("status");
    nextParams.delete("applicationExperience");
    setSearchParams(nextParams);
  };

  return (
    <div className="grid gap-7">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-lg font-semibold">Filters</h2>
        <Button type="button" variant="outline" size="sm" onClick={handleClearFilters}>
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
            onValueChange={(value) => handleFilterChange("category", value)}
          />
          <FilterSelect
            label="Experience"
            options={experienceLevels}
            placeholder="All levels"
            value={experienceLevel}
            onValueChange={(value) => handleFilterChange("experienceLevel", value)}
          />
          <FilterSelect
            label="Workplace type"
            options={workplaceTypes}
            placeholder="All types"
            value={workplaceType}
            onValueChange={(value) => handleFilterChange("workplaceType", value)}
          />
          {isAdmin ? (
            <FilterSelect
              label="Status"
              options={jobStatuses}
              placeholder="All statuses"
              value={jobStatus}
              onValueChange={(value) => handleFilterChange("status", value)}
            />
          ) : null}
        </>
      ) : (
        <FilterSelect
          label="Years of experience"
          options={applicationExperienceOptions}
          placeholder="All experience"
          value={applicationExperience}
          onValueChange={(value) => handleFilterChange("applicationExperience", value)}
        />
      )}
    </div>
  );
}
