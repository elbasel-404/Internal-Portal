"use server"

import { db } from "@db"
import { getUserIndex } from "@db/actions"
import { getUserId } from "@server"

export const removeBatchProduct = async (index: number) => {
  try {
    await db.read()
    const userId = await getUserId()
    if (!userId) return

    const userIndex = await getUserIndex(userId)

    const userData = db.data.users[userIndex]

    userData.batchProducts.splice(index, 1)

    await db.write()
  } catch (error) {}
}
