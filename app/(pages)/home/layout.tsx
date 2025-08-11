// app/(pages)/home/layout.tsx
import { getUserId } from "@server"
import { type ReactNode } from "react"
import { getUser } from "@db/actions"
import { createInitialSlots, filterSlots, renderLayout } from "./util"
import { HomePageSlotKey } from "@types"
import { unstable_cache } from "next/cache"

export interface HomePageLayoutProps {
  children: ReactNode
  completeProfile: ReactNode
  generalInfo: ReactNode
  userInfo: ReactNode
  attendance: ReactNode
  approvalRequestsTable: ReactNode
  sliders: ReactNode
  news: ReactNode
  timelineCalendar: ReactNode
}

export const dynamic = "force-dynamic"

const HomePageLayout = async ({
  children,
  completeProfile,
  generalInfo,
  userInfo,
  attendance,
  approvalRequestsTable,
  sliders,
  timelineCalendar,
  news,
}: HomePageLayoutProps): Promise<ReactNode> => {
  const initSlots = createInitialSlots({
    children,
    completeProfile,
    generalInfo,
    userInfo,
    attendance,
    approvalRequestsTable,
    sliders,
    timelineCalendar,
    news,
  })

  const userId = await getUserId()
  if (!userId)
    return renderLayout({ slotsToRender: initSlots, children, userId })

  const user = await unstable_cache(async () => await getUser(userId), [], {
    revalidate: false,
    tags: ["user"],
  })()
  const activeSlotKeys = user.activeHomePageSlotsKeys || []
  const slotsToRender = filterSlots(initSlots, activeSlotKeys)
  const visuallyHiddenKeys: HomePageSlotKey[] = []

  if (user.activeNewsTabsKeys.length === 0) visuallyHiddenKeys.push("news")
  // Only push "news" key if all active keys are in the specified list or there are no keys
  if (
    user.activeNewsTabsKeys.length === 0 ||
    (user.activeNewsTabsKeys.length === 4 &&
      user.activeNewsTabsKeys.every((key) =>
        ["vpn", "nationalId", "office", "email"].includes(key),
      ))
  ) {
    visuallyHiddenKeys.push("news")
  }

  return renderLayout({ slotsToRender, children, userId, visuallyHiddenKeys })
}

export default HomePageLayout
