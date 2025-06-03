"use server"

import { revalidatePath } from "next/cache"
import { db } from "../db"
import { getUserIndex } from "./getUserIndex"
import { paths } from "@lib"

type Args = {
  demo: boolean
  userId: number
}
export const setDemo = async ({ demo, userId }: Args) => {
  const userIndex = await getUserIndex(userId)
  console.log({ userIndex })
  await db.read()
  db.data.users[userIndex].demo = demo
  await db.write()
  revalidatePath(paths.vacations.href)
  // await db.update(({ users }) => {
  //   users[userIndex].demo = demo;
  // });
}
