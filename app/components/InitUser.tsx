"use client"

import { getUserId } from "@server"
import { useEffect, useState } from "react"
import { createUser } from "../server/createUser"
// import { createUser } from "../server/createUser";
// import { clearUser, getPrismaUser } from "@server";

export const InitUser = () => {
  const [userId, setUserId] = useState<number>()
  const initUser = async () => {
    const userId = await getUserId()
    if (userId) {
      setUserId(userId)
      return
    }
    const newUserId = await createUser()
    setUserId(newUserId)
  }

  useEffect(() => {
    initUser()
  }, [])

  useEffect(() => {
    localStorage.setItem("userId", userId?.toString() || "")
  }, [userId])

  return null
}
