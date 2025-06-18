import { userSchema } from "@db/schemas"
import type { User } from "@db/types"
import { ErrorMessage } from "@lib"

export const validateUser = async (user: User): Promise<User> => {
  const validatedUser = userSchema.parse(user)

  return validatedUser
}
