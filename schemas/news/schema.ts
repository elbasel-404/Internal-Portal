import * as z from "zod";


export const CreateUidEnumSchema = z.enum([
    "Hamad Y. Alqushaymit",
    "Majid A Albaddah",
    "Shahad H. Alrushaidan",
]);
export type CreateUidEnum = z.infer<typeof CreateUidEnumSchema>;


export const TypeSchema = z.enum([
    "news",
]);
export type Type = z.infer<typeof TypeSchema>;

export const NewsElementSchema = z.object({
    "id": z.number(),
    "published": z.boolean(),
    "title": z.string(),
    "image": z.string(),
    "image_file_name": z.string(),
    "attachment": z.boolean(),
    "attachment_file_name": z.boolean(),
    "resume": z.string(),
    "description": z.string(),
    "type": TypeSchema,
    "tag_ids": z.array(z.any()),
    "comment_ids": z.array(z.number()),
    "like_ids": z.array(z.number()),
    "create_uid": z.array(z.union([CreateUidEnumSchema, z.number()])),
    "create_date": z.coerce.date(),
    "write_uid": z.array(z.union([CreateUidEnumSchema, z.number()])),
    "write_date": z.coerce.date(),
    "display_name": z.string(),
    "__last_update": z.coerce.date(),
});
export type NewsElement = z.infer<typeof NewsElementSchema>;
