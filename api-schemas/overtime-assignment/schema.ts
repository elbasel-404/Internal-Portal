import * as z from "zod";

export const OvertimeAssignmentElementSchema = z.object({
  id: z.number(),
  name: z.string(),
  date: z.string(),
  employee_id: z.array(z.union([z.string(), z.number()])),
  state: z.string(),
  date_from: z.string(),
  date_to: z.string(),
  nb_hours: z.number(),
  description: z.string(),
  department_id: z.array(z.union([z.number(), z.string()])),
  job_id: z.array(z.union([z.string(), z.number()])),
  type_job_id: z.array(z.union([z.string(), z.number()])),
});
export type OvertimeAssignmentElement = z.infer<
  typeof OvertimeAssignmentElementSchema
>;
