"use server";

import { encrypt } from "@utils";
import { cookies } from "next/headers";
import { z } from "zod";
import { getEmployeeId } from "./getEmployeeId";

export const signIn = async (formData: FormData) => {
  // ! ================= ENV =================
  const CLIENT_SECRET = process.env.CLIENT_SECRET;
  const CLIENT_ID = process.env.CLIENT_ID;
  const SCOPE = process.env.SCOPE;
  const GRANT_TYPE = process.env.GRANT_TYPE;
  const API_KEY = process.env.API_KEY;
  const ROOT_API_URL = process.env.API_ROOT_URL;
  const SESSION_ID = process.env.SESSION_ID;

  if (!ROOT_API_URL) throw new Error("Invalid root api url");
  if (!CLIENT_SECRET) throw new Error("Invalid client secret");
  if (!CLIENT_ID) throw new Error("Invalid client ID");
  if (!SCOPE) throw new Error("Invalid scope");
  if (!GRANT_TYPE) throw new Error("Invalid grant type");
  if (!API_KEY) throw new Error("Invalid api key");
  if (!SESSION_ID) throw new Error("Invalid api key");

  // ! ================= FORM DATA=================
  const formUsername = formData.get("username")?.toString().trim();
  const formPassword = formData.get("password")?.toString().trim();
  const creds = { username: formUsername, password: formPassword };
  const credsValidation = validationSchema.safeParse(creds);

  // ! ================= FORM VALIDATION =================
  if (!credsValidation.success) {
    console.log({
      credsValidationError: credsValidation.error.format(),
    });
    return;
  }

  // ! ================= FETCH SETUP =================
  const { username, password } = credsValidation.data;
  const AUTH_ENDPOINT_URL = `http://172.25.54.80/api/authentication/oauth2/v2/token`;
  const method = "POST";
  const headers = {
    Connection: "keep-alive",
    "x-api-key": API_KEY,
    // "Accept-Encoding": "identity",
    "Content-Type": "application/json",
    Cookie: `session_id=${SESSION_ID}`,
  };
  const body = JSON.stringify({
    grant_type: GRANT_TYPE,
    scope: SCOPE,
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    username,
    password,
  });

  // ! ================= FETCH =================
  const response = await fetch(AUTH_ENDPOINT_URL, {
    method,
    headers,
    body,
  });

  const responseJson = await response.json();

  // ! ================= RESPONSE VALIDATION =================
  const authResponseValidation = authResponseSchema.safeParse(responseJson);

  if (!authResponseValidation.success) {
    const authResponseValidationError = JSON.stringify(
      authResponseValidation.error.format()
    );
    console.log({ authResponseValidationError });
    return;
  }

  const {
    result: {
      body: { scope, expires_in, access_token, refresh_token, token_type },
    },
  } = authResponseValidation.data;

  // ! ================= SESSION =================
  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
  const session = await encrypt({
    scope,
    expires_in,
    access_token,
    refresh_token,
    token_type,
    expires,
    username,
  });
  const cookieStore = await cookies();
  cookieStore.set("session", session, { expires, httpOnly: true });

  // ! ================= Employee ID =================
  console.log("Getting employee id...");
  const accessToken = access_token;
  const employeeId = await getEmployeeId({
    username,
    password,
    accessToken,
  });
  console.log("Logged in with", { employeeId });
  cookieStore.set("employeeId", employeeId);
};

// ! ================= SCHEMAS =================
const validationSchema = z.object({
  username: z.string().nonempty().min(3),
  password: z.string().nonempty().min(3),
});

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
});
