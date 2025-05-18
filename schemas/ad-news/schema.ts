import * as z from "zod";


export const CreateUidEnumSchema = z.enum([
    "Abdulmajeed A. Alrasheed",
    "Monirah F. Alrabiah",
    "Reema A. Alsunayyin",
]);
export type CreateUidEnum = z.infer<typeof CreateUidEnumSchema>;


export const TypeSchema = z.enum([
    "ads",
]);
export type Type = z.infer<typeof TypeSchema>;

export const AdNewSchema = z.object({
    "id": z.number(),
    "published": z.boolean(),
    "title": z.string(),
    "image": z.string(),
    "image_file_name": z.string(),
    "attachment": z.union([z.boolean(), z.string()]),
    "attachment_file_name": z.union([z.boolean(), z.string()]),
    "resume": z.string(),
    "description": z.string(),
    "type": TypeSchema,
    "tag_ids": z.array(z.any()),
    "comment_ids": z.array(z.number()),
    "like_ids": z.array(z.number()),
    "create_uid": z.array(z.union([CreateUidEnumSchema, z.number()])),
    "create_date": z.coerce.date(),
    "write_uid": z.array(z.union([z.number(), z.string()])),
    "write_date": z.coerce.date(),
    "display_name": z.string(),
    "__last_update": z.coerce.date(),
});
export type AdNew = z.infer<typeof AdNewSchema>;
