"use server"

import { db } from "@db" // Database instance
import { getUserIndex } from "@db/actions"
import { getUserId } from "@server"
import { BatchSchema } from "@zodSchemas"

export const batchsFormAction = async (formData: FormData) => {
  try {
    const formEntries = formData.entries()
    const rawData = Object.fromEntries(formEntries)

    const responseData = { ...rawData }

    const {
      success,
      data: validatedData,
      // error is not used, removing to fix linting error
    } = BatchSchema.safeParse(responseData)

    await db.read()

    const userId = await getUserId()
    if (!userId) return
    if (!success) return

    const userIndex = await getUserIndex(userId)
    db.data.users[userIndex].batchs.push(validatedData)

    await db.write()
  } catch {
    // Error handling could be added here in the future
  }
}
