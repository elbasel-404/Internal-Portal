"use server"

import { db } from "@db"
import { getUserIndex } from "@db/actions"
import { getUserId } from "@server"

export const removeProjectCompletion = async (index: number) => {
  try {
    await db.read()
    const userId = await getUserId()
    if (!userId) throw new Error("Invalid User ID")

    const userIndex = await getUserIndex(userId)

    const userData = db.data.users[userIndex]
    if (!userData?.projectCompletion) {
      throw new Error("Project Completion entry not found")
    }

    userData.projectCompletion.splice(index, 1)

    await db.write()
  } catch (error) {
    console.error("Failed to remove project completion:", error)
  }
}
