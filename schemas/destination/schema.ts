import * as z from "zod";


export const DestinationElementSchema = z.object({
    "id": z.number(),
    "name": z.string(),
});
export type DestinationElement = z.infer<typeof DestinationElementSchema>;
