"use server"

import type { HomePageSlotKey } from "@types"
import { getUserIndex } from "@db/actions"
import { db } from "@db"

type Args = {
  key: HomePageSlotKey
  originIndex: number
  destinationIndex: number
  userId?: number
  indexOffset: number
}

export const handleDrag = async ({
  key,
  originIndex,
  destinationIndex,
  userId,
  indexOffset,
}: Args) => {
  if (!userId) return
  const userIndex = await getUserIndex(userId)
  db.data.users[userIndex].activeHomePageSlotsKeys.splice(
    originIndex + indexOffset,
    1,
  )
  db.data.users[userIndex].activeHomePageSlotsKeys.splice(
    destinationIndex + indexOffset,
    0,
    key,
  )
  await db.write()
}
