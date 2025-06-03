import { getUser } from "@server"
import { UserInfo } from "../components"

const UserInfoSlot = async () => {
  const user = await getUser()
  return <UserInfo key="user-info" user={user} />
}

export default UserInfoSlot
