import { z } from 'zod';
import { modalPaths } from '@lib';

export const modalNames = Object.keys(modalPaths) as [keyof typeof modalPaths];

export const modalNameSchema = z.enum(modalNames);
