"use server";

import { z } from "zod";

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

export const signIn = async (formData: FormData) => {
  // ! ================= ENV =================
  const CLIENT_SECRET = process.env.CLIENT_SECRET;
  const CLIENT_ID = process.env.CLIENT_ID;
  const SCOPE = process.env.SCOPE;
  const GRANT_TYPE = process.env.GRANT_TYPE;

  if (!CLIENT_SECRET) throw new Error("Invalid client secret");
  if (!CLIENT_ID) throw new Error("Invalid client ID");
  if (!SCOPE) throw new Error("Invalid scope");
  if (!GRANT_TYPE) throw new Error("Invalid grant type");
  console.log({
    CLIENT_ID,
    CLIENT_SECRET,
    SCOPE,
    GRANT_TYPE,
  });

  // ! ================= FORM =================
  const formUsername = formData.get("username")?.toString().trim();
  const formPassword = formData.get("password")?.toString().trim();
  const creds = { username: formUsername, password: formPassword };
  const credsValidation = validationSchema.safeParse(creds);

  if (!credsValidation.success) {
    console.log({
      credsValidationError: JSON.stringify(
        credsValidation.error.flatten().fieldErrors
      ),
    });
    return;
  }

  const { username, password } = credsValidation.data;

  const AUTH_ENDPOINT_URL =
    "http://172.25.54.80/api/authentication/oauth2/v2/token";
  const method = "POST";
  const headers = {
    Connection: "keep-alive",
    "x-api-key": "85ced9c9-b64b-4d76-85a5-ae3b869b044d",
    "Accept-Encoding": "identity",
    "Content-Type": "application/json",
  };
  const body = JSON.stringify({
    grant_type: GRANT_TYPE,
    scope: SCOPE,
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    username,
    password,
  });

  const response = await fetch(AUTH_ENDPOINT_URL, {
    method,
    headers,
    body,
  });

  const responseJson = await response.json();
  const authResponseValidation = authResponseSchema.safeParse(responseJson);
  console.log({ body: responseJson?.result?.body });
  console.log({ authResponseData: authResponseValidation.data });

  if (!authResponseValidation.success) {
    const authResponseValidationError = JSON.stringify(
      authResponseValidation.error.format()
    );
    console.log({ authResponseValidationError });
    return;
  }

  const {
    result: {
      body: { access_token, expires_in, refresh_token, scope, token_type },
    },
  } = authResponseValidation.data;

  console.log({
    access_token,
    expires_in,
    refresh_token,
    scope,
    token_type,
  });
};
