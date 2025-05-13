import * as z from "zod";


export const BankDetailSchema = z.object({
    "id": z.number(),
    "name": z.string(),
    "street": z.boolean(),
    "street2": z.boolean(),
    "zip": z.boolean(),
    "city": z.union([z.boolean(), z.string()]),
    "state": z.boolean(),
    "country": z.union([z.array(z.union([z.number(), z.string()])), z.boolean()]),
    "email": z.boolean(),
    "phone": z.boolean(),
    "active": z.boolean(),
    "bic": z.union([z.boolean(), z.string()]),
    "create_uid": z.array(z.union([z.number(), z.string()])),
    "create_date": z.coerce.date(),
    "write_uid": z.array(z.union([z.number(), z.string()])),
    "write_date": z.coerce.date(),
    "display_name": z.string(),
    "__last_update": z.coerce.date(),
});
export type BankDetail = z.infer<typeof BankDetailSchema>;
