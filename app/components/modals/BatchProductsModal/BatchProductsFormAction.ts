"use server"

import { db } from "@db"; // Database instance
import { getUserIndex } from "@db/actions"
import { getUserId } from "@server"
import { BatchProductSchema } from "@zodSchemas"

export const batchProductsFormAction = async (formData: FormData) => {
  try {
    const formEntries = formData.entries()
    const rawData = Object.fromEntries(formEntries)

    const responseData = { ...rawData }

    console.log("response", responseData)

    const {
      success,
      data: validatedData,
      // error is not used, removing to fix linting error
    } = BatchProductSchema.safeParse(responseData)

    await db.read()

    console.log("validatedData", validatedData)

    const userId = await getUserId()
    if (!userId) return
    if (!success) return

    const userIndex = await getUserIndex(userId)
    db.data.users[userIndex].batchProducts.push(validatedData)

    await db.write()
  } catch {
    // Error handling could be added here in the future
  }
}
