import {
  CovenantSchema,
  generalInfoKeyEnum,
  homePageSlotKeyEnum,
  newsTabsKeyEnum,
} from '@zodSchemas';
import { z } from 'zod';

export const userSchema = z.object({
  id: z.number(),
  activeGeneralInfoKeys: z.array(generalInfoKeyEnum).max(6),
  activeHomePageSlotsKeys: z.array(homePageSlotKeyEnum),
  activeNewsTabsKeys: z.array(newsTabsKeyEnum),
  demo: z.boolean(),
  convenantData: z.array(CovenantSchema),
});
