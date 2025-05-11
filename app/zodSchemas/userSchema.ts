import { z } from 'zod';
import { CovenantSchema } from './covenantSchema';
import { generalInfoKeyEnum } from './generalInfoKeyEnum';
import { homePageSlotKeyEnum } from './homePageSlotKeyEnum';
import { newsTabsKeyEnum } from './newsTabsKeyEnum';

export const userSchema = z.object({
  id: z.number(),
  activeGeneralInfoKeys: z.array(generalInfoKeyEnum).max(6),
  activeHomePageSlotsKeys: z.array(homePageSlotKeyEnum),
  activeNewsTabsKeys: z.array(newsTabsKeyEnum),
  demo: z.boolean(),
  convenantData: z.array(CovenantSchema),
});
