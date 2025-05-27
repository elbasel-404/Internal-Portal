"use server";

import { cookies } from "next/headers";

export const getStoredEmployeeId = async () => {
    const cookieStore = await cookies();
    const storedEmployeeId = cookieStore.get("employeeId");
    return storedEmployeeId?.value.toString();
}