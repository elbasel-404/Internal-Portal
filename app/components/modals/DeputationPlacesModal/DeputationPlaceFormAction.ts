"use server"

import { db } from "@db"; // Database instance
import { getUserIndex } from "@db/actions"
import { getUserId } from "@server"
import { DeputationLocationSchema } from "@zodSchemas"

export const deputationPlaceFormAction = async (formData: FormData) => {
  //TODO: Handle Store Places
  try {
    const formEntries = formData.entries()
    const rawData = Object.fromEntries(formEntries)

    const responseData = { ...rawData }

    const {
      success,
      data: validatedData,
      // error is not used, removing to fix linting error
    } = DeputationLocationSchema.safeParse(responseData)

    await db.read()

    const userId = await getUserId()
    if (!userId) return
    if (!success) return

    console.log(success, validatedData)

    const userIndex = await getUserIndex(userId)
    db.data.users[userIndex].deputationLocation.push(validatedData)

    await db.write()
  } catch {
    // Error handling could be added here in the future
  }
}
