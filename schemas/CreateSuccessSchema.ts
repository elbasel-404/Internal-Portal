import { z } from "zod";

export const CreateSuccessSchema = z.object({
  status: z.string(),
  message: z.string(),
  data: z.object({
    id: z.number(),
  }),
});
