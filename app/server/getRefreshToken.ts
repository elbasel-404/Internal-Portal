"use server"

import { cookies } from "next/headers"

export const getRefreshToken = async () => {
    const cookieStore = await cookies();
    const refereshToken = cookieStore.get("refersh_token")?.value;
    return refereshToken

}