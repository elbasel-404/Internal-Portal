"use server"

import { db } from "@db"
import { getUserIndex } from "@db/actions"
import { getUserId } from "@server"

export const removeBatch = async (index: number) => {
  try {
    await db.read()
    const userId = await getUserId()
    if (!userId) return

    const userIndex = await getUserIndex(userId)

    const userData = db.data.users[userIndex]

    userData.batchs.splice(index, 1)

    await db.write()
  } catch {
    // Error handling could be added here in the future
  }
}
