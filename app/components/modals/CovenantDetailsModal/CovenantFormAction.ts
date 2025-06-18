"use server"

import { db } from "@db" // Database instance
import { getUserIndex } from "@db/actions"
import { getUserId } from "@server"
import { CovenantSchema } from "@zodSchemas"

export const covenantFormAction = async (formData: FormData) => {
  try {
    const formEntries = formData.entries()
    const rawData = Object.fromEntries(formEntries)

    const attachmentsRaw = formData.getAll("attachments") as File[]

    const attachments = attachmentsRaw.map((f) => {
      return f.name
    })

    const responseData = { ...rawData, attachments }

    const {
      success,
      data: validatedData,
      error,
    } = CovenantSchema.safeParse(responseData)

    await db.read()

    const userId = await getUserId()
    if (!userId) return
    if (!success) return

    const userIndex = await getUserIndex(userId)
    db.data.users[userIndex].convenantData.push(validatedData)

    await db.write()
  } catch (error) {}
}
