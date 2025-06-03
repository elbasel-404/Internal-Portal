"use server"

import { db } from "@db" // Database instance
import { getUserIndex } from "@db/actions"
import { getUserId } from "@server"
import { TrainingCoursesSchema } from "@zodSchemas"

export const trainingCoursesFormAction = async (formData: FormData) => {
  try {
    const formEntries = formData.entries()
    const rawData = Object.fromEntries(formEntries)

    const responseData = { ...rawData }

    console.log(responseData)

    const {
      success,
      data: validatedData,
      error,
    } = TrainingCoursesSchema.safeParse(responseData)

    console.log(success, validatedData, error)

    await db.read()

    const userId = await getUserId()
    if (!userId) {
      throw new Error(
        "Invalid User Id (app/components/modals/TrainingCoursesModal/TrainingCoursesFormActions.ts)",
      )
    }
    if (!success) {
      throw new Error(
        "Validation Error (app/components/modals/TrainingCoursesModal/TrainingCoursesFormActions.ts)",
        error,
      )
    }
    const userIndex = await getUserIndex(userId)
    db.data.users[userIndex].trainingCourses.push(validatedData)

    await db.write()
  } catch (error) {
    console.error(error)
  }
}
