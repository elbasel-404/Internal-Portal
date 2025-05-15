import * as z from "zod";


export const RelativeRelationElementSchema = z.object({
    "id": z.string(),
    "name": z.string(),
});
export type RelativeRelationElement = z.infer<typeof RelativeRelationElementSchema>;
