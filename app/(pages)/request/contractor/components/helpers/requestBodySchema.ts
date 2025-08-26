import { z } from "zod"

export const requestBodySchema = z.object({
  purchase_request_id: z.string(),
  project_name: z.string(),
  contractor_company: z.string(),
  contract_date_start: z.string(),
  contract_date_end: z.string(),
  contract_name: z.string(),
  id_number: z.string(),
  nationality: z.string(),
  job_title: z.string(),
  employee_number: z.string(),
  email: z.string(),
  mobile: z.string(),
  confirm_information: z.boolean(),
  identity_attachment_ids: z.string(),
  acceptable_use_attachment_ids: z.string(),
  nondisclosure_attachment_ids: z.string(),
})
