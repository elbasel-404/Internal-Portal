import { z } from 'zod';
import { generalInfoKeyEnum } from './generalInfoKeyEnum';

export const generalInfoSchema = z.array(
  z.object({
    id: z.number(),
    userId: z.number(),
    key: generalInfoKeyEnum,
    active: z.boolean(),
    index: z.number(),
    slotType: z.literal('generalInfo'),
  })
);
