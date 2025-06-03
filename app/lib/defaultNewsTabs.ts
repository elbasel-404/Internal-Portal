import type { NewsTab } from "@types"

export const defaultNewsTabs: NewsTab[] = [
  {
    id: -80,
    key: "pressTab",
    active: true,
    label: "الملف الصحفى",
  },
  {
    id: -81,
    key: "newsTab",
    active: true,
    label: "الأخبار",
  },
  {
    id: -82,
    key: "monshaatFamilyTab",
    active: true,
    label: "عائلة منشآت",
  },
  {
    id: -83,
    key: "internalTab",
    active: true,
    label: "إعلانات داخلية",
  },
] as const
