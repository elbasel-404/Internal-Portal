"use server"

import { encrypt } from "@utils"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import z from "zod"

export const refreshSession = async () => {
  const cookieStore = await cookies()
  const refreshToken = cookieStore.get("refersh_token")?.value
  // cookieStore.set("session", "test")
  if (!refreshToken) {
    console.log("No referesh token found")
    return "No Refresh token found"
  }

  const url =
    "https://apis.monshaat.gov.sa/ERP/TaskService/api/authentication/oauth2/v2/token"
  const requestBody = JSON.stringify({
    grant_type: "refresh_token",
    client_id: "0XsaYG4EZ6PHvXOfrQv8xAJRhAf4J8",
    client_secret: "2d3jQiuywKHdpJWskoMtZejkN3znKS",
    refresh_token: refreshToken,
  })

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": "85ced9c9-b64b-4d76-85a5-ae3b869b044d",
    },
    body: requestBody,
  })
  const responseJson = await response.json()
  const { data } = authResponseSchema.safeParse(responseJson)
  if (!data) {
    console.log(responseJson)
    throw new Error("Invalid referesh sesssion response")
  }
  const { result } = data
  const { body } = result
  const { access_token, expires_in, token_type, scope, refresh_token } = body

  const session = await encrypt({
    scope,
    expires_in,
    access_token,
    refresh_token,
    token_type,
  })

  cookieStore.set("session", session)
  cookieStore.set("refersh_token", refresh_token)
  revalidatePath("/")
}

const authResponseSchema = z.object({
  result: z.object({
    body: z.object({
      access_token: z.string(),
      expires_in: z.number(),
      token_type: z.string(),
      scope: z.string(),
      refresh_token: z.string(),
    }),
  }),
})
