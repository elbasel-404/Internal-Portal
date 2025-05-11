import { z } from 'zod';
import type { generalInfoKeyEnum } from '@zodSchemas';

export type GeneralInfoKey = z.TypeOf<typeof generalInfoKeyEnum>;