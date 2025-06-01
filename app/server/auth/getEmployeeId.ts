"use server";

import { ProfileElementSchema, ResponseSchema } from "@api/schemas";
import { getFetchHeaders } from "../getFetchHeaders";

export const getEmployeeId = async () => {
    // ! VARIABLES
    // ! ==================================
    const url = "api/po/read/profile";
    const apiRootUrl = process.env.API_ROOT_URL as string;
    const { headers } = await getFetchHeaders();
    const requestBody = {};
    const requestBodyString = JSON.stringify(requestBody);
    const requestUrl = `${apiRootUrl}/${url}`;

    // ! FETCH
    // ! ==================================
    const apiResponse = await fetch(requestUrl, {
        headers,
        method: "POST",
        body: requestBodyString,
    });
    const responseJson = await apiResponse.json();

    // ! VALIDATION
    // ! ==================================
    const validatedResponse = ResponseSchema.parse(responseJson);
    const { result } = validatedResponse;
    const { data } = result;
    const validatedData = ProfileElementSchema.parse(data[0]);

    // ! PARSING
    const employeeId = validatedData.id.toString();
    return employeeId;
};
