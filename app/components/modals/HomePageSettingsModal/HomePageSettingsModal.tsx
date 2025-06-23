import { generalInfoKeys, homePageSlotsKeys, newsTabsKeys } from "@lib"
import { getUserId } from "@server"
import { GeneralInfoKey, HomePageSlotKey, NewsTabsKey } from "@types"
import { getSlotTitle } from "@utils"
import { Modal } from "../Modal"
import { ToggleForm } from "./ToggleForm"
// Removed unused import: ErrorMessage
import { getUser } from "@db/actions"

// TODO: Test with other values?
export const dynamic = "force-dynamic"

export const HomePageSettingsModal = async () => {
  const userId = await getUserId()
  if (!userId) return

  const user = await getUser(userId)
  const activeHomePageSlotsKeys = user.activeHomePageSlotsKeys
  const activeGeneralInfoKeys = user.activeGeneralInfoKeys
  const activeNewsTabsKeys = user.activeNewsTabsKeys

  if (!activeHomePageSlotsKeys || !activeGeneralInfoKeys || !activeNewsTabsKeys)
    return

  const excludedHomePageSlotsKeys: HomePageSlotKey[] = [
    "completeProfile",
    "generalInfo",
    "news",
  ]

  const filteredHomePageSlotsKeys = homePageSlotsKeys.filter(
    (key) => !excludedHomePageSlotsKeys.includes(key),
  )

  const firstCol = [...generalInfoKeys]
  const secondColPartOne = [...newsTabsKeys]
  const secondColPartTwo = [...filteredHomePageSlotsKeys]

  const renderCol = (
    keys: (GeneralInfoKey | NewsTabsKey | HomePageSlotKey)[],
    slotType: "news" | "homePage" | "generalInfo",
  ) => {
    let activeKeys: (GeneralInfoKey | NewsTabsKey | HomePageSlotKey)[] = []
    if (slotType === "news") activeKeys = activeNewsTabsKeys
    if (slotType === "homePage") activeKeys = activeHomePageSlotsKeys
    if (slotType === "generalInfo") activeKeys = activeGeneralInfoKeys

    return keys.map((key) => {
      const active = activeKeys.includes(key)
      const title = getSlotTitle({ key, type: slotType })
      return (
        <ToggleForm
          slotType={slotType}
          slotTitle={title}
          slotKey={key}
          key={key}
          active={active}
          userId={userId}
        />
      )
    })
  }

  return (
    <Modal
      // * Or if the database is hosted on a different server:
      // * `router.refresh()` will be faster than revalidateHomepage()
      // onModalClose={revalidateHomePage}
      // initialContentClassName='h-screen md:w-[52vw]'
      refreshOnClose={true}
      introContentClassName="slide-in-from-bottom-full"
      outroContentClassName="slide-out-to-bottom-full"
    >
      <div className="grid grid-cols-2 overflow-y-hidden h-full gap-4">
        <div className="flex h-full flex-col">
          <h2 className="font-medium">الموشرات</h2>
          <div className="mx-3">{renderCol(firstCol, "generalInfo")}</div>
        </div>
        <div className="flex h-full flex-col">
          <>
            <h2 className="font-medium">الاخبار والإعلانات</h2>
            <div className="mx-3">{renderCol(secondColPartOne, "news")}</div>
          </>
          <div>{renderCol(secondColPartTwo, "homePage")}</div>
        </div>
      </div>
    </Modal>
  )
}
