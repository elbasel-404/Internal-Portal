import { userSchema } from "@db/schemas"
import type { User } from "@db/types"
import { ErrorMessage } from "@lib"
import { throwError } from "@utils"

export const validateUser = async (user: User): Promise<User> => {
  const validation = userSchema.safeParse(user)
  if (!validation.success) {
    console.log(validation.error.issues)
    return throwError(ErrorMessage.invalidUserSchema)
  }
  return validation.data
}
