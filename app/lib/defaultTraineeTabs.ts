import type { NewsTab } from "@types"

export const defaultTraineeTabs: NewsTab[] = [
  {
    id: -80,
    key: "vpn",
    active: true,
    label: "طلب حساب (vpn)",
  },
  {
    id: -81,
    key: "nationalId",
    active: true,
    label: "طلب البطاقة",
  },
  {
    id: -82,
    key: "office",
    active: true,
    label: "طلب مكتب",
  },
  {
    id: -83,
    key: "email",
    active: true,
    label: "طلب بريد الكتروني",
  },
] as const
