import * as z from "zod";


export const OvertimeListElementSchema = z.object({
    "id": z.number(),
    "name": z.string(),
});
export type OvertimeListElement = z.infer<typeof OvertimeListElementSchema>;
