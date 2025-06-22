"use server"
import "server-only"

// Removed unused import: ErrorMessage
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
