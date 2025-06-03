/**
 * Toggles the active state of a user's home page slot.
 *
 * @param {Object} args - The arguments object.
 * @param {HomePageSlotKey} args.key - The key of the home page slot to toggle.
 * @param {number} args.userId - The ID of the user whose home page slot is being toggled.
 * @param {boolean} [args.active] - Optional. The desired active state of the home page slot.
 * If not provided, the function will toggle the current state.
 *
 * @returns {Promise<{ success: boolean, errors: null }>} - An object indicating the success of the operation and any errors.
 *
 * @throws {Error} - Throws an error if the user index cannot be found or if there is an issue with the database operation.
 */
import { HomePageSlotKey } from "@types"
import { getUserIndex } from "./getUserIndex"
import { db } from "../db"
import { getAllUsers } from "./getAllUsers"

type Args = {
  key: HomePageSlotKey
  userId: number
  active?: boolean
}

export const toggleUserHomePageSlot = async ({ key, userId, active }: Args) => {
  const userIndex = await getUserIndex(userId)
  const allUsers = await getAllUsers()
  const user = allUsers[userIndex]
  const currentActiveHomePageSlotKeys = user.activeHomePageSlotsKeys
  const isAlreadyActive = currentActiveHomePageSlotKeys.includes(key)

  if (active === undefined) {
    active = !isAlreadyActive
  }

  if (active && !isAlreadyActive) {
    currentActiveHomePageSlotKeys.push(key)
  } else if (!active && isAlreadyActive) {
    const newActiveHomePageSlotKeys = currentActiveHomePageSlotKeys.filter(
      (k) => k !== key,
    )
    db.data.users[userIndex].activeHomePageSlotsKeys = newActiveHomePageSlotKeys
  }

  await db.write()
  return {
    success: true,
    errors: null,
  }
}
