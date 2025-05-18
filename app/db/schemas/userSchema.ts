import {
  BatchProductSchema,
  BatchSchema,
  CovenantSchema,
  generalInfoKeyEnum,
  homePageSlotKeyEnum,
  newsTabsKeyEnum,
  ProductSchema,
  ProjectCompletionSchema,
} from '@zodSchemas';
import { z } from 'zod';

export const userSchema = z.object({
  id: z.number(),
  activeGeneralInfoKeys: z.array(generalInfoKeyEnum).max(6),
  activeHomePageSlotsKeys: z.array(homePageSlotKeyEnum),
  activeNewsTabsKeys: z.array(newsTabsKeyEnum),
  demo: z.boolean(),
  convenantData: z.array(CovenantSchema),
  projectCompletion: z.array(ProjectCompletionSchema),
  products: z.array(ProductSchema),
  batchs: z.array(BatchSchema),
  batchProducts: z.array(BatchProductSchema),
});
