"use server"

import { getAllUsers } from "./getAllUsers"

export const getUserIndex = async (userId: number) => {
  const allUsers = await getAllUsers()
  const userIndex = allUsers.findIndex(({ id }) => id === userId)
  return userIndex
}
