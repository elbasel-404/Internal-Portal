import { homePageSlotKeyEnum } from "@zodSchemas"
import { z } from "zod"

export type HomePageSlotKey = z.TypeOf<typeof homePageSlotKeyEnum>
