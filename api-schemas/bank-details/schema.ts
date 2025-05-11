import * as z from "zod";


export const BankDetailSchema = z.object({
    "id": z.number(),
    "name": z.string(),
    "display_name": z.string(),
});
export type BankDetail = z.infer<typeof BankDetailSchema>;
