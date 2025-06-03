import { homePageSlotKeyEnum } from "@zodSchemas"
import { z } from "zod"

export const homePageSlotsSchema = z.array(
  z.object({
    title: z.optional(z.string()),
    id: z.number(),
    active: z.boolean(),
    index: z.number(),
    key: homePageSlotKeyEnum,
    userId: z.number(),
    slotType: z.literal("homePage"),
  }),
)
