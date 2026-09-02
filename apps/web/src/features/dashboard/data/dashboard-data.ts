import type { ApplicationStatusI } from "@job-portal/contracts/applications";
import type { CreateJobInputI } from "@job-portal/contracts/jobs";

export type AdminJobI = CreateJobInputI & {
  id: string;
  applicationsCount: number;
  logo: string;
  postedAt: string;
};

export type AdminApplicationI = {
  id: string;
  candidate: string;
  jobId: string;
  status: ApplicationStatusI;
  appliedAt: string;
  yearsOfExperience: number;
  education: string;
  currentCompany: string | null;
  currentRole: string | null;
  expectedSalary: number;
  noticePeriodDays: number;
  skills: readonly string[];
};

export const adminJobs: AdminJobI[] = [
  {
    id: "1",
    title: "Product Designer",
    description:
      "Design product flows, collaborate with engineering, and improve recruiter-facing experiences across the hiring platform.",
    company: "Landeed",
    location: "Hyderabad, India",
    workplaceType: "ON_SITE",
    category: "DESIGN",
    experienceLevel: "MID",
    skills: ["Figma", "Product Design", "User Research"],
    status: "PUBLISHED",
    isFeatured: true,
    applicationsCount: 18,
    logo: "LA",
    postedAt: "2d ago",
  },
  {
    id: "2",
    title: "Software Engineer",
    description:
      "Build reliable job search and application workflows using React, TypeScript, Node.js, and PostgreSQL.",
    company: "Baxter",
    location: "Bangalore, India",
    workplaceType: "ON_SITE",
    category: "ENGINEERING",
    experienceLevel: "ENTRY",
    skills: ["React", "TypeScript", "Node.js"],
    status: "PUBLISHED",
    isFeatured: false,
    applicationsCount: 24,
    logo: "BX",
    postedAt: "5d ago",
  },
  {
    id: "3",
    title: "Senior Software Engineer I - Mobile Developer",
    description:
      "Own mobile application features, mentor engineers, and partner with product teams on roadmap delivery.",
    company: "Talkdesk",
    location: "Bengaluru, India",
    workplaceType: "ON_SITE",
    category: "ENGINEERING",
    experienceLevel: "SENIOR",
    skills: ["React Native", "TypeScript", "Testing"],
    status: "DRAFT",
    isFeatured: false,
    applicationsCount: 7,
    logo: "TD",
    postedAt: "5d ago",
  },
  {
    id: "4",
    title: "Software Engineer",
    description:
      "Develop healthcare platform modules with a focus on API quality, observability, and frontend reliability.",
    company: "GE Healthcare",
    location: "Bengaluru, India",
    workplaceType: "HYBRID",
    category: "ENGINEERING",
    experienceLevel: "MID",
    skills: ["Express", "PostgreSQL", "React"],
    status: "PUBLISHED",
    isFeatured: true,
    applicationsCount: 11,
    logo: "GE",
    postedAt: "6d ago",
  },
  {
    id: "5",
    title: "Application Developer",
    description:
      "Maintain internal application tools, improve release quality, and support finance operation workflows.",
    company: "Barclays",
    location: "Pune, India",
    workplaceType: "ON_SITE",
    category: "FINANCE",
    experienceLevel: "ENTRY",
    skills: ["JavaScript", "SQL", "APIs"],
    status: "CLOSED",
    isFeatured: false,
    applicationsCount: 32,
    logo: "BA",
    postedAt: "6d ago",
  },
  {
    id: "6",
    title: "Front-End Integration Engineer",
    description:
      "Integrate complex frontend workflows with service APIs and design systems for distributed teams.",
    company: "NVIDIA",
    location: "Bengaluru, India",
    workplaceType: "REMOTE",
    category: "ENGINEERING",
    experienceLevel: "MID",
    skills: ["React", "Design Systems", "GraphQL"],
    status: "PUBLISHED",
    isFeatured: false,
    applicationsCount: 15,
    logo: "NV",
    postedAt: "7d ago",
  },
];

export const adminApplications: AdminApplicationI[] = [
  {
    id: "1",
    candidate: "Ananthakrishnan",
    jobId: "2",
    status: "APPLIED",
    appliedAt: "Today",
    yearsOfExperience: 2,
    education: "B.Tech Computer Science",
    currentCompany: "Acme Labs",
    currentRole: "Frontend Developer",
    expectedSalary: 700000,
    noticePeriodDays: 30,
    skills: ["React", "TypeScript", "Node.js"],
  },
  {
    id: "2",
    candidate: "Meera Nair",
    jobId: "1",
    status: "REVIEWING",
    appliedAt: "1d ago",
    yearsOfExperience: 3,
    education: "B.Des Interaction Design",
    currentCompany: "Studio Grid",
    currentRole: "Product Designer",
    expectedSalary: 900000,
    noticePeriodDays: 45,
    skills: ["Figma", "Research", "Prototyping"],
  },
  {
    id: "3",
    candidate: "Rahul Menon",
    jobId: "5",
    status: "APPLIED",
    appliedAt: "2d ago",
    yearsOfExperience: 1,
    education: "MCA",
    currentCompany: null,
    currentRole: null,
    expectedSalary: 500000,
    noticePeriodDays: 0,
    skills: ["JavaScript", "SQL", "APIs"],
  },
];
