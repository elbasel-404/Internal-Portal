"use server"

import { decrypt } from "@utils"
import { cookies } from "next/headers"

interface AuthSession {
  scope: string
  expires_in: number
  access_token: string
  refresh_token: string
  token_type: string
  expires: string
  username: string
  iat: number
  exp: number
}
export const getSession = async (): Promise<AuthSession | null> => {
  const cookieStore = await cookies()
  const session = cookieStore.get("session")?.value
  if (!session) return null
  const decryptedSession = await decrypt(session)
  return decryptedSession as unknown as AuthSession
}
