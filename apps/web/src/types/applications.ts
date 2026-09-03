import type { ApplicationStatusI } from "@job-portal/contracts";

export type ApplicationDataI = {
  id: string;
  userId: string;
  jobId: string;
  status: ApplicationStatusI;
  yearsOfExperience?: number;
  education?: string;
  currentCompany?: string;
  currentRole?: string;
  expectedSalary?: number;
  noticePeriodDays?: number;
  skills?: string[];
  createdAt?: string;
  updatedAt?: string;
  user?: {
    id: string;
    name: string;
    email: string;
  };
  job?: {
    id: string;
    title: string;
    company: string;
    location: string;
    category?: string;
  };
};

export type ApplicationsStateI = {
  myApplications: ApplicationDataI[];
  allApplications: ApplicationDataI[];
};
