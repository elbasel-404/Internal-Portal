"use server"

import { getSession } from "@auth"

export const getFetchHeaders = async () => {
  const API_KEY = process.env.API_KEY as string
  const API_KEY_HEADER_NAME = process.env.API_KEY_HEADER_NAME as string
  const SESSION_ID = process.env.SESSION_ID as string

  const session = await getSession()
  if (!session) {
    throw new Error("No session found. Please log in.")
  }

  const { access_token } = session
  const BEARER_TOKEN = access_token

  const headers = {
    [API_KEY_HEADER_NAME]: API_KEY,
    Authorization: `Bearer ${BEARER_TOKEN}`,
    "Content-Type": "application/json",
    Cookie: `session_id=${SESSION_ID}`,
    "Accept-Encoding": "identity",
  }
  return { headers }
}
