"use server"

import { getFetchHeaders } from "../../server/getFetchHeaders"
import { RequestGeneralInfoModel } from "./types/RequestGeneralInfoModel"

interface GetGeneralInfoParams {
  model: RequestGeneralInfoModel
}

const apiRootUrl = process.env.API_ROOT_URL

export const getGeneralInfo = async ({ model }: GetGeneralInfoParams) => {
  const { headers } = await getFetchHeaders()
  const fetchUrl = `${apiRootUrl}/api/po/statistics`
  const response = await fetch(fetchUrl, {
    method: "POST",
    headers,
    body: JSON.stringify({ model }),
  })
  const json = await response.json()
  const result = json.result
  const data = result.data
  console.log({ data })

  return data
}
