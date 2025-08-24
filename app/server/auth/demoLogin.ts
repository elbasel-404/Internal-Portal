"use server"

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { encrypt } from "@utils"
import { cookies } from "next/headers"
import { InitialState } from "../../components/Login"
import { revalidatePath } from "next/cache"

export const demoLogin = async (
  prevState: any,
  formData: FormData,
) => {
  const session = await encrypt({
    scope: "demo",
    expires_in: "demo",
    access_token: "demo",
    refresh_token: "demo",
    token_type: "demo",
    expires: "demo",
    username: "demo",
  })

  const cookieStore = await cookies()
  cookieStore.set("session", session, {
    expires: new Date(Date.now() + 60 * 60 * 1000),
    httpOnly: true,
  })
  cookieStore.set("demo", "true")
  cookieStore.set("refresh_token", "demo")

  // ! ================= Employee ID =================
  cookieStore.set("employeeId", "demo", {
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    httpOnly: true,
  })

  cookieStore.set("logged_out", "false")
  cookieStore.set("demoLogin", "true")

  revalidatePath("/home")

  // ! ================= Return =================
  const returnObject: InitialState = {
    error: null,
  }
  return returnObject
}
