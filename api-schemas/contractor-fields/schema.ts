import * as z from "zod"

export const RequestContractorFieldsElementSchema = z.object({
  purchase_request_id: z.any(),
  purchase_request_name: z.any(),
  project_name: z.any(),
  contractor_company: z.any(),
  contract_date_start: z.any(),
  contract_date_end: z.any(),
  contract_name: z.any(),
  identity_attachment_ids: z.any(),
  acceptable_use_attachment_ids: z.any(),
  nondisclosure_attachment_ids: z.any(),
})
export type RequestCreateWorkflowElement = z.infer<
  typeof RequestContractorFieldsElementSchema
>
