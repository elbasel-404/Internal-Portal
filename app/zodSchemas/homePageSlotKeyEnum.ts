import { z } from "zod"
import { homePageSlotsKeys } from "@lib"

export const homePageSlotKeyEnum = z.enum(homePageSlotsKeys)
