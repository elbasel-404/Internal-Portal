"use server"

import { db } from "@db"
import { getUserIndex } from "@db/actions"
import { getUserId } from "@server"

export const removeProduct = async (index: number) => {
  try {
    await db.read()
    const userId = await getUserId()
    if (!userId) throw new Error("Invalid User ID")

    const userIndex = await getUserIndex(userId)

    const userData = db.data.users[userIndex]
    if (!userData?.products) {
      throw new Error("Product entry not found")
    }

    userData.products.splice(index, 1)

    await db.write()
  } catch (error) {
    console.error("Failed to remove project completion:", error)
  }
}
