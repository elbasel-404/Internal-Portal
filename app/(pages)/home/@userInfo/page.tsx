import { getProfileInfo } from "@server"
import { UserInfo } from "../components"

const UserInfoSlot = async () => {
  const user = await getProfileInfo()
  return <UserInfo key="user-info" user={user} />
}

export default UserInfoSlot
