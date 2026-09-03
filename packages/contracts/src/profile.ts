import { z } from "zod";

const nullableTextSchema = (message: string) =>
  z.preprocess((value) => {
    if (value === null || value === undefined) {
      return null;
    }

    if (typeof value === "string" && value.trim() === "") {
      return null;
    }

    return value;
  }, z.string().trim().min(1, message).nullable());

export const candidateProfileSchema = z.object({
  phone: z.string().trim().min(1, "Phone number is required"),
  education: z.string().trim().min(1, "Highest education is required"),
  yearsOfExperience: z.coerce
    .number("Enter your years of experience")
    .int("Enter a whole number like 3 instead of 3.5")
    .min(0, "Years of experience cannot be negative"),
  currentCompany: nullableTextSchema("Current company cannot be empty"),
  currentRole: nullableTextSchema("Current role cannot be empty"),
  expectedSalary: z.coerce
    .number("Enter your expected salary")
    .int("Enter a whole number amount without decimals")
    .min(0, "Expected salary cannot be negative"),
  noticePeriodDays: z.coerce
    .number("Enter your notice period in days")
    .int("Enter a whole number of days")
    .min(0, "Notice period cannot be negative"),
  skills: z
    .array(z.string().trim().min(1, "Skill cannot be empty"))
    .min(1, "Add at least one skill"),
});

export type CandidateProfileInputI = z.infer<typeof candidateProfileSchema>;
