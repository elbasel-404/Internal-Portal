import { defaultGeneralInfo, defaultHomePageSlots, defaultNewsTabs } from "@lib"
import type { GeneralInfoKey, HomePageSlotKey, NewsTabsKey } from "@types"

type Args = {
  type: "generalInfo" | "homePage" | "news"
  key: HomePageSlotKey | GeneralInfoKey | NewsTabsKey
}
export const getSlotTitle = ({ key, type }: Args) => {
  if (type === "homePage") {
    const title = defaultHomePageSlots.find((slot) => slot.key === key)?.title
    return title
  }

  if (type === "generalInfo") {
    const title = defaultGeneralInfo.find((slot) => slot.key === key)?.title
    return title
  }

  if (type === "news") {
    const title = defaultNewsTabs.find((slot) => slot.key === key)?.label
    return title
  }
}
