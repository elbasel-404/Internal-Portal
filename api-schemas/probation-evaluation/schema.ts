import * as z from "zod";

export const ProbationLineIdSchema = z.object({
    "question": z.string(),
    "answer": z.string(),
});
export type ProbationLineId = z.infer<typeof ProbationLineIdSchema>;

export const ProbationEvaluationElementSchema = z.object({
    "id": z.number(),
    "name": z.string(),
    "number": z.string(),
    "employee_id": z.array(z.union([z.number(), z.string()])),
    "recommendation": z.string(),
    "date": z.string(),
    "date_hiring": z.string(),
    "date_probation_end": z.string(),
    "recruiter_date": z.union([z.boolean(), z.string()]),
    "attachment_ids": z.array(z.any()),
    "state": z.string(),
    "notes": z.boolean(),
    "probation_line_ids": z.array(ProbationLineIdSchema),
    "reason": z.boolean(),
    "set_to_draft_reason": z.boolean(),
    "workflow_user_ids": z.array(z.any()),
    "job_id": z.array(z.union([z.number(), z.string()])),
    "department_id": z.array(z.union([z.number(), z.string()])),
    "can_submit": z.boolean(),
    "can_refuse": z.boolean(),
    "can_approve": z.boolean(),
});
export type ProbationEvaluationElement = z.infer<typeof ProbationEvaluationElementSchema>;
