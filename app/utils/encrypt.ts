"use server"
import { SignJWT } from "jose"

export const encrypt = async (payload: Record<string, unknown>) => {
  const key = new TextEncoder().encode(process.env.AUTH_SECRET)

  const encryptedJWT = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1 day from now")
    .sign(key)

  return encryptedJWT
}
