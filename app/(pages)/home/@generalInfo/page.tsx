// import { getUser } from "@db/actions"
// import { InfoGrid } from "@components"
// import { defaultGeneralInfo } from "@lib"
import { RequestGeneralData } from "@components"
import { getSession, getUserId } from "@server"

// export const dynamic = "force-dynamic"
// const MAX_INFO_SLOTS = 6

const GeneralInfoSlot = async () => {
  const session = await getSession();
  if (!session) return null;
  const userId = await getUserId()
  // let info = defaultGeneralInfo

  if (userId) {
    // const user = await getUser(userId)
    // const activeGeneralInfoKeys = user.activeGeneralInfoKeys
    // info = info.filter((i) => activeGeneralInfoKeys.includes(i.key))
  }

  // const infoToRender = info.slice(0, MAX_INFO_SLOTS)

  // TODO: not integrated
  return <RequestGeneralData model="holidays" />
}

export default GeneralInfoSlot
