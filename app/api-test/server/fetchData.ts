"use server"

import type { ActionState } from "@api/types/ActionState"

export const fetchData = async (
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> => {
  const dataObject = Object.fromEntries(formData.entries())
  const url = dataObject["url"]
  const redirect = dataObject["headers-redirect"]
  const apiKey = dataObject["headers-x-api-key"]
  const authorization = dataObject["headers-authorization"]
  const contentType = dataObject["headers-Content-Type"]
  const cookie = dataObject["headers-Cookie"]
  const apiRootUrl = dataObject["env-vars-apiRootUrl"]

  const headers = {
    "x-api-key": typeof apiKey === "string" ? apiKey : "",
    Authorization: typeof authorization === "string" ? authorization : "",
    "Content-Type": typeof contentType === "string" ? contentType : "",
    Cookie: typeof cookie === "string" ? cookie : "",
    redirect: typeof redirect === "string" ? redirect : "",
  }

  const objectKeys = Object.keys(dataObject)
  const requestBody = objectKeys
    .filter((key) => {
      const keySplit = key.split("-")
      const isRequestBodyParam =
        keySplit[0] === "request" && keySplit[1] === "body"
      if (isRequestBodyParam) return true
    })
    .map((key) => {
      const keySplit = key.split("-")
      const value = dataObject[key]
      const newKey = keySplit[2] // Remove "request-body
      return { key: newKey, value }
    })
    .reduce(
      (acc, curr) => {
        acc[curr.key] = curr.value
        return acc
      },
      {} as Record<string, unknown>,
    )

  const requestHeaders = objectKeys
    .filter((key) => {
      const keySplit = key.split("-")
      const isRequestHeaderParam = keySplit[0] === "headers"
      if (isRequestHeaderParam) return true
    })
    .map((key) => {
      const value = dataObject[key]
      const newKey = key.replace("headers-", "") // Support header names with dashes
      return { key: newKey, value: typeof value === "string" ? value : "" }
    })
    .reduce(
      (acc, curr) => {
        acc[curr.key] = curr.value
        return acc
      },
      {} as Record<string, string>,
    )

  Object.assign(headers, requestHeaders)
  console.log({ apiRootUrl, requestHeaders, requestBody, url })
  const response = await fetch(`${apiRootUrl}/${url}`, {
    credentials: "include",
    headers: requestHeaders,
    method: "POST",
    body: JSON.stringify(requestBody),
  })

  const responseJson = await response.json()

  return {
    data: responseJson,
    error: null,
  }
}
