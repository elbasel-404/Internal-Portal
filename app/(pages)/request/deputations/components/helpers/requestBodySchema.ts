import { z } from "zod"

export const requestBodySchema = z.object({
  employee_id: z.any(),
  type: z.any(),
  training_request_number: z.any(),
  task_name: z.any(),
  deputation_type: z.any(),
  transportation_type: z.any(),
  training_request_id: z.any(),
  city_id: z.any(),
  distance: z.any(),
  date_from: z.any(),
  date_to: z.any(),
  substitute_employee_id: z.any(),
  note: z.any(),
  attachment_ids: z.instanceof(File).or(z.any()),
})
