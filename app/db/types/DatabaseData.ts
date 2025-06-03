import type { User } from "@db/types"

export type DatabaseData = {
  users: User[]
  userCount: number
}
