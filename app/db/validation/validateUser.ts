"use server"

import { userSchema } from "@db/schemas"
import type { User } from "@db/types"
// import { logout } from "@auth"
// import { clearUser } from "@server"

export const validateUser = async (user: User): Promise<User> => {
  const userValid = userSchema.parse(user)
  return userValid
}
