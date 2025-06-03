"use server"

import { getFetchHeaders } from "./getFetchHeaders"

export const acceptTraining = async (trainingId: string) => {
  const url = "api/po/hr/training/action-candidate"
  const apiRootUrl = process.env.API_ROOT_URL as string
  const { headers } = await getFetchHeaders()
  const requestBody = { training_id: trainingId }
  const requestBodyString = JSON.stringify(requestBody)
  const requestUrl = `${apiRootUrl}/${url}`

  const apiResponse = await fetch(requestUrl, {
    headers,
    method: "POST",
    body: requestBodyString,
  })

  const responseJson = await apiResponse.json()
  const results = responseJson.result
  return results
}
