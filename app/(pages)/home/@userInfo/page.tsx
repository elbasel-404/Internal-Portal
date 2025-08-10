import { getProfileInfo, getSession } from "@server"
import { UserInfo } from "../components"

const UserInfoSlot = async () => {
  const session = await getSession()
  if (!session) {
    return null
  }
  const user = await getProfileInfo()
  return <UserInfo key="user-info" user={user} />
}

export default UserInfoSlot
