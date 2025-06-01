"use server";

import { getSession } from "@auth";

export const getFetchHeaders = async () => {
  const API_KEY = process.env.API_KEY as string;
  const API_KEY_HEADER_NAME = process.env.API_KEY_HEADER_NAME as string;
  const SESSION_ID = process.env.SESSION_ID as string;
  const session = await getSession();
  if (!session) {
    console.error("No session found");
    console.log({ session });
    throw new Error("No session found");
  }
  if (!session) throw new Error(`Error getting session ${{ session }}`);
  const { access_token } = session;
  const BEARER_TOKEN = access_token;

  const session = await getSession();
  if (!session) {
    console.error("No session found");
    console.log({ session })
    throw new Error("No session found");
  }
  const { access_token } = session;
  const BEARER_TOKEN = access_token;

  const session = await getSession();
  if (!session) {
    console.error("No session found");
    console.log({ session })
    throw new Error("No session found");
  }
  const { access_token } = session;
  const BEARER_TOKEN = access_token;

  if (!API_KEY || !API_KEY_HEADER_NAME || !BEARER_TOKEN || !SESSION_ID) {
    console.log({
      API_KEY,
      API_KEY_HEADER_NAME,
      BEARER_TOKEN,
      SESSION_ID,
    });
    throw new Error("Missing env variables");
  }

  const headers = {
    [API_KEY_HEADER_NAME]: API_KEY,
    Authorization: `Bearer ${BEARER_TOKEN}`,
    "Content-Type": "application/json",
    Cookie: `session_id=${SESSION_ID}`,
    "Accept-Encoding": "identity",
  };
  return { headers };
};
