import type { ApplicationStatusI } from "@job-portal/contracts";

export type ApplicationDataI = {
  id: string;
  userId?: string;
  jobId?: string;
  status: ApplicationStatusI;
  phone?: string;
  yearsOfExperience?: number;
  education?: string;
  currentCompany?: string | null;
  currentRole?: string | null;
  expectedSalary?: number;
  noticePeriodDays?: number;
  skills?: string[];
  createdAt?: string;
  updatedAt?: string;
  candidate?:
    | string
    | {
        id?: string;
        name?: string;
        email?: string;
      };
  user?: {
    id: string;
    name: string;
    email: string;
  };
  profile?: {
    phone?: string;
    yearsOfExperience?: number;
    education?: string;
    currentCompany?: string | null;
    currentRole?: string | null;
    expectedSalary?: number;
    noticePeriodDays?: number;
    skills?: string[];
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
