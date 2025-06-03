import { z } from "zod"

export const TrainingCoursesSchema = z.object({
  dateFrom: z.string().min(1),
  dateTo: z.string().min(1),
  travelDateSettings: z.string().optional(),
  duration: z.string().optional(),
})
