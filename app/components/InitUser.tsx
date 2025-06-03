"use client"

import { getUserId } from "@server"
import { useEffect } from "react"
import { createUser } from "../server/createUser"
// import { createUser } from "../server/createUser";
// import { clearUser, getPrismaUser } from "@server";

export const InitUser = () => {
  const initUser = async () => {
    const userId = await getUserId()
    if (userId) return
    createUser()
    // const clientSecret = localStorage.getItem("clientSecret");
    // const user = await getPrismaUser();

    // if (user?.clientSecret === clientSecret) return;
    // await clearUser();
    // const newUser = await createUser();
    // localStorage.setItem("clientSecret", newUser.clientSecret);
  }

  useEffect(() => {
    initUser()
  }, [])

  return null
}
