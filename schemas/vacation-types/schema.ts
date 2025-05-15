import * as z from "zod";


export const VacationTypeSchema = z.object({
    "id": z.number(),
    "name": z.string(),
    "display_name": z.string(),
});
export type VacationType = z.infer<typeof VacationTypeSchema>;
