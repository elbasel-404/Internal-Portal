import { getUser } from "@db/actions"
import { InfoGrid } from "@components"
import { defaultGeneralInfo } from "@lib"
import { getUserId } from "@server"

export const dynamic = "force-dynamic"
const MAX_INFO_SLOTS = 6

const GeneralInfoSlot = async () => {
  const userId = await getUserId()
  let info = defaultGeneralInfo

  if (userId) {
    const user = await getUser(userId)
    const activeGeneralInfoKeys = user.activeGeneralInfoKeys
    info = info.filter((i) => activeGeneralInfoKeys.includes(i.key))
  }

  const infoToRender = info.slice(0, MAX_INFO_SLOTS)

  return <InfoGrid info={infoToRender} />
}

export default GeneralInfoSlot
