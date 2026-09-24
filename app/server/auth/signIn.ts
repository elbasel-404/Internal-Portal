"use server"

import { encrypt } from "@utils"
import { cookies } from "next/headers"
import { z } from "zod"
import { getEmployeeId } from "./getEmployeeId"
import { InitialState } from "../../components/Login"
import { revalidatePath } from "next/cache"

export const signIn = async (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  prevState: any,
  formData: FormData,
): Promise<InitialState> => {
  // ! ================= ENV =================
  const CLIENT_SECRET = "some_random_string"
  const CLIENT_ID = "some_random_string"
  const SCOPE = "some_random_string"
  const GRANT_TYPE = "some_random_string"
  const API_KEY = "some_random_string"
  const API_ROOT_URL = "some_random_string"
  const SESSION_ID = "some_random_string"

  // ! ================= FORM DATA=================
  const formUsername = formData.get("username")?.toString().trim()
  const formPassword = formData.get("password")?.toString().trim()
  const creds = { username: formUsername, password: formPassword }
  const credsValidation = validationSchema.safeParse(creds)

  // ! ================= FORM VALIDATION =================
  if (!credsValidation.success) {
    return {
      error: "Invalid username or password",
    }
  }

  // ! ================= FETCH SETUP =================
  const { username, password } = credsValidation.data
  const AUTH_ENDPOINT_URL = `${API_ROOT_URL}/api/authentication/oauth2/v2/token`
  const method = "POST"
  const headers = {
    Connection: "keep-alive",
    "x-api-key": API_KEY,
    // "Accept-Encoding": "identity",
    "Content-Type": "application/json",
    Cookie: `session_id=${SESSION_ID}`,
  }
  const body = JSON.stringify({
    grant_type: GRANT_TYPE,
    scope: SCOPE,
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    username,
    password,
  })

  let response
  // ! ================= FETCH =================
  try {
    response = await fetch(AUTH_ENDPOINT_URL, {
      method,
      headers,
      body,
    })
  } catch (error) {
    const e = error as Error
    if (e.message.toLowerCase() === "fetch failed") {
      return {
        error: "Network error: Fetch failed.",
      }
    }
  }
  const responseJson = await response?.json()
  // ! ================= RESPONSE VALIDATION =================
  const authResponseValidation = authResponseSchema.safeParse(responseJson)

  if (!authResponseValidation.data) {
    return {
      error: "Invalid username or password",
    }
  }

  const {
    result: {
      body: { scope, expires_in, access_token, refresh_token, token_type },
    },
  } = authResponseValidation.data

  // ! ================= SESSION =================
  const expires = new Date(Date.now() + 60 * 60 * 1000) // 1 hour
  const session = await encrypt({
    scope,
    expires_in,
    access_token,
    refresh_token,
    token_type,
    expires,
    username,
  })

  const cookieStore = await cookies()
  cookieStore.set("session", session, { expires, httpOnly: true })
  cookieStore.set("demo", "false")
  cookieStore.set("refersh_token", refresh_token)

  // ! ================= Employee ID =================
  const employeeId = await getEmployeeId()
  cookieStore.set("employeeId", employeeId ?? "none", {
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    httpOnly: true,
  })

  cookieStore.set("logged_out", "false")

  revalidatePath("/home")
  // ! ================= Return =================
  const returnObject: InitialState = {
    error: null,
  }
  return returnObject
}

// ! ================= SCHEMAS =================
const validationSchema = z.object({
  username: z.string().nonempty().min(3),
  password: z.string().nonempty().min(3),
})

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
