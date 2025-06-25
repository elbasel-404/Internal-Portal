import * as z from "zod";


export const TrainingFieldSchema = z.object({
    "id": z.any(),
    "name": z.any().optional(),
    "training_type": z.any().optional()
});
export type TrainingField = z.infer<typeof TrainingFieldSchema>;
