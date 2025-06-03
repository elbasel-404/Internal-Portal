"use server"

import type { User } from "@db/types"
import { validateUser } from "@db/validation"

type ReturnType = Promise<User[]>
export const validateAllUsers = async (users: User[]): ReturnType => {
  const allValidUsers = await Promise.all(
    users.map(async (u) => {
      const validUser = await validateUser(u)
      return validUser
    }),
  )

  return allValidUsers
}
