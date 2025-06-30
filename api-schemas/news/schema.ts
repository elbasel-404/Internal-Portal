import * as z from "zod"

export const NewsElementSchema = z.object({
  id: z.any(),
  published: z.any(),
  title: z.any(),
  image: z.any(),
  image_file_name: z.any(),
  attachment: z.any(),
  attachment_file_name: z.any(),
  resume: z.any(),
  description: z.any(),
  type: z.any(),
  tag_ids: z.any(),
  comment_ids: z.any(),
  like_ids: z.any(),
  create_uid: z.any(),
  create_date: z.any(),
  write_uid: z.any(),
  write_date: z.any(),
  display_name: z.any(),
  __last_update: z.any(),
})
export type NewsElement = z.infer<typeof NewsElementSchema>

// export const NewsElementSchema = z.object({
//   id: z.number(),
//   published: z.boolean(),
//   title: z.string(),
//   image: z.string(),
//   image_file_name: z.string(),
//   attachment: z.boolean(),
//   attachment_file_name: z.boolean(),
//   resume: z.string(),
//   description: z.string(),
//   type: z.string(),
//   tag_ids: z.array(z.any()),
//   comment_ids: z.array(z.number()),
//   like_ids: z.array(z.number()),
//   create_uid: z.array(z.union([z.number(), z.string()])),
//   create_date: z.coerce.date(),
//   write_uid: z.array(z.union([z.number(), z.string()])),
//   write_date: z.coerce.date(),
//   display_name: z.string(),
//   __last_update: z.coerce.date(),
// })
export type NewsElementType = z.infer<typeof NewsElementSchema>
