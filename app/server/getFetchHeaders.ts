"use server"

import { getSession } from "@auth"

export const getFetchHeaders = async () => {
  const API_KEY = process.env.API_KEY as string
  const API_KEY_HEADER_NAME = process.env.API_KEY_HEADER_NAME as string
  const SESSION_ID = process.env.SESSION_ID as string
  const session = await getSession()
  if (!session) {
    console.error("No user session found, please re-login")
    throw new Error("No active user session")
  }

  const access_token = session?.access_token
  const BEARER_TOKEN = access_token

  if (!API_KEY || !API_KEY_HEADER_NAME || !SESSION_ID || !BEARER_TOKEN) {
    const error = new Error()
    const stack = error.stack;
    console.error(extractFilePaths(stack))
    console.error("Missing required environment variables for API headers", {
      API_KEY,
      API_KEY_HEADER_NAME,
      SESSION_ID,
      BEARER_TOKEN,
      session,
    })
  }
  const headers = {
    // redirect: "follow" as RequestRedirect,
    [API_KEY_HEADER_NAME]: API_KEY,
    Authorization: `Bearer ${BEARER_TOKEN}`,
    "Content-Type": "application/json",
    Cookie: `session_id=${SESSION_ID}`,
    // "Accept-Encoding": "identity",
  }
  return { headers }
}

const extractFilePaths = (text: string | undefined) => {
  if (!text) return []
  const regex = /([./\w()@-]+\.tsx?:\d+:\d+)/g
  const files = [...text.matchAll(regex)].map((m) =>
    m[1].replace("///(rsc)/", ""),
  )
  files.shift()
  return files
}