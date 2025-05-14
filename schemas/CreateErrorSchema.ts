import { z } from "zod";

export const CreateErrorSchema = z.object({
  status: z.literal("error"),
  error: z.string(),
});
