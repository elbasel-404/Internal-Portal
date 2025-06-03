/**
 * Toggles the active state of a user's news tab.
 *
 * @param {Object} args - The arguments object.
 * @param {NewsTabsKey} args.key - The key of the news tab to toggle.
 * @param {number} args.userId - The ID of the user.
 * @param {boolean} [args.active] - The desired active state of the news tab. If not provided, the active state will be toggled.
 * @returns {Promise<{ success: boolean; errors: null }>} - An object indicating the success of the operation and any errors.
 */
import { NewsTabsKey } from "@types"
import { getUserIndex } from "./getUserIndex"
import { db } from "../db"
import { getAllUsers } from "./getAllUsers"

type Args = {
  key: NewsTabsKey
  userId: number
  active?: boolean
}

export const toggleUserNewsTab = async ({ key, userId, active }: Args) => {
  const userIndex = await getUserIndex(userId)
  const allUsers = await getAllUsers()
  const user = allUsers[userIndex]
  const currentActiveNewsTabsKeys = user.activeNewsTabsKeys
  const isAlreadyActive = currentActiveNewsTabsKeys.includes(key)

  if (active === undefined) {
    active = !isAlreadyActive
  }

  if (active && !isAlreadyActive) {
    currentActiveNewsTabsKeys.push(key)
  } else if (!active && isAlreadyActive) {
    const newActiveNewsTabsKeys = currentActiveNewsTabsKeys.filter(
      (k) => k !== key,
    )
    db.data.users[userIndex].activeNewsTabsKeys = newActiveNewsTabsKeys
  }

  await db.write()
  return {
    success: true,
    errors: null,
  }
}
