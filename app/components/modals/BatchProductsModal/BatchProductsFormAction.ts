"use server"

import { db } from "@db" // Database instance
import { getUserIndex } from "@db/actions"
import { getUserId } from "@server"
import { BatchProductSchema } from "@zodSchemas"

export const batchProductsFormAction = async (formData: FormData) => {
  try {
    const formEntries = formData.entries()
    const rawData = Object.fromEntries(formEntries)

    const responseData = { ...rawData }

    const {
      success,
      data: validatedData,
      error,
    } = BatchProductSchema.safeParse(responseData)

    await db.read()

    const userId = await getUserId()
    if (!userId) {
      throw new Error(
        "Invalid User Id (app/components/modals/BatchProductsModal/BatchProductsFormActions.ts)",
      )
    }
    if (!success) {
      throw new Error(
        "Validation Error (app/components/modals/BatchProductsModal/BatchProductsFormActions.ts)",
        error,
      )
    }
    const userIndex = await getUserIndex(userId)
    db.data.users[userIndex].batchProducts.push(validatedData)

    await db.write()
  } catch (error) {
    console.error(error)
  }
}
