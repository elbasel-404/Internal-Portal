import { z } from "zod"
import { BatchProductSchema } from "./batchProductsSchema"
import { BatchSchema } from "./batchSchema"
import { CovenantSchema } from "./covenantSchema"
import { generalInfoKeyEnum } from "./generalInfoKeyEnum"
import { homePageSlotKeyEnum } from "./homePageSlotKeyEnum"
import { newsTabsKeyEnum } from "./newsTabsKeyEnum"
import { ProductSchema } from "./productSchema"
import { ProjectCompletionSchema } from "./projectCompletionSchema"
import { TrainingCoursesSchema } from "./trainingCoursesSchema"

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
  trainingCourses: z.array(TrainingCoursesSchema),
})
