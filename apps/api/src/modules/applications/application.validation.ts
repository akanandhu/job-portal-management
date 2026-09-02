import { z } from "zod";

export const applyToJobParamsSchema = z.object({
  jobId: z.uuid()
});
