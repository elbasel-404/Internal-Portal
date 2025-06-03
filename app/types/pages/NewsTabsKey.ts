import type { newsTabsKeyEnum } from "@zodSchemas"
import { z } from "zod"

export type NewsTabsKey = z.TypeOf<typeof newsTabsKeyEnum>
