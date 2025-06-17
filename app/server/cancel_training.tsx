"use server"

import { getFetchHeaders } from "./getFetchHeaders"

export const cancelTraining = async (trainingId: string) => {
  const url = "api/po/hr/training/cancel-candidate"
  const apiRootUrl = process.env.API_ROOT_URL as string
  const fetchHeaders = await getFetchHeaders()
  const headers = fetchHeaders?.headers
  const requestBody = {
    training_id: trainingId,
    cancel_reason: "cancel_reason",
  }
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
