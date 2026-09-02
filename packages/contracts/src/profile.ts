import { z } from "zod";

export const candidateProfileSchema = z.object({
  phone: z.string().trim().min(1),
  education: z.string().trim().min(1),
  yearsOfExperience: z.coerce.number().int().min(0),
  currentCompany: z.string().trim().min(1).nullable(),
  currentRole: z.string().trim().min(1).nullable(),
  expectedSalary: z.coerce.number().int().min(0),
  noticePeriodDays: z.coerce.number().int().min(0),
  skills: z.array(z.string().trim().min(1)).min(1),
});

export type CandidateProfileInputI = z.infer<typeof candidateProfileSchema>;
