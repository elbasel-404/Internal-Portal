"use server";

import { jwtVerify } from "jose";

export const decrypt = async (input: string) => {
  const key = new TextEncoder().encode(process.env.AUTH_SECRET);
  const { payload } = await jwtVerify(input, key, { algorithms: ["HS256"] });
  return payload;
};
