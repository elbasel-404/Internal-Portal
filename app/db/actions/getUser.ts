"use server"
import "server-only"

import { ErrorMessage } from "@lib"
import { getAllUsers } from "@db/actions"
import { validateUser } from "@db/validation"
import { User } from "@db/types"

export const getUser = async (userId: number): Promise<User> => {
  const allUsers = await getAllUsers()
  const userIndex = allUsers.findIndex(({ id }) => id === userId)

  const user = allUsers[userIndex]
  const validatedUser = await validateUser(user)
  return validatedUser
}
