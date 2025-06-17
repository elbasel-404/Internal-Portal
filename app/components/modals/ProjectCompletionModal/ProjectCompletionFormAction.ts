"use server"

import { db } from "@db" // Database instance
import { getUserIndex } from "@db/actions"
import { getUserId } from "@server"
import { ProjectCompletionSchema } from "@zodSchemas"

export const projectCompletionFormAction = async (formData: FormData) => {
  try {
    const formEntries = formData.entries()
    const rawData = Object.fromEntries(formEntries)

    const responseData = { ...rawData }

    const {
      success,
      data: validatedData,
      error,
    } = ProjectCompletionSchema.safeParse(responseData)

    await db.read()

    const userId = await getUserId()
    if (!userId) return
    if (!success) return

    const userIndex = await getUserIndex(userId)
    db.data.users[userIndex].projectCompletion.push(validatedData)

    await db.write()
  } catch (error) {}
}
