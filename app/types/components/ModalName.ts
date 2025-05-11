import { z } from 'zod';
import { modalNameSchema } from '@zodSchemas';

export type ModalName = z.infer<typeof modalNameSchema>;
