import { z } from "zod"

export const requestBodySchema = z.object({
  employee_id: z.any(),
  request_type: z.any(),
  attachment_types_ids: z.any(),
  strategic_plan_type_id: z.any(),
  request_title: z.any(),
  purchase_initiative_id: z.any(),
  purchase_program_id: z.any(),
  payment_partner_id: z.any(),
  direct_payment_type_id: z.any(),
  date_start_project: z.any(),
  date_end_project: z.any(),
  duration_project: z.any(),
  estimated_budget: z.any(),
  award_amount: z.any(),
  notes: z.any(),
  attachment_ids: z.instanceof(File).or(z.any()),
})
