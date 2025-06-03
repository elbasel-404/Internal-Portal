import { z } from "zod"
import { userSchema } from "../zodSchemas/userSchema"
import { generalInfoKeys } from "./generalInfoKeys"
import { homePageSlotsKeys } from "./homePageSlotsKeys"
import { newsTabsKeys } from "./newsTabsKeys"

export const defaultUser: z.TypeOf<typeof userSchema> = {
  id: -1,
  activeGeneralInfoKeys: [...generalInfoKeys.slice(0, 6)],
  activeHomePageSlotsKeys: [...homePageSlotsKeys],
  activeNewsTabsKeys: [...newsTabsKeys],
  demo: true,
  convenantData: [
    {
      product: "prod",
      statement: "active",
      amount: "10",
      invoiceNumber: "25",
      attachments: ["file-name-i"],
    },
  ],
  projectCompletion: [],
  products: [],
  batchs: [],
  batchProducts: [],
  trainingCourses: [],
} as const
