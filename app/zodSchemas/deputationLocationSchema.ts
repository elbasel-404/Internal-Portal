import { z } from "zod"

export const DeputationLocationSchema = z.object({
  country_id: z.string().optional(),
  city_name: z.string().optional(),
})
