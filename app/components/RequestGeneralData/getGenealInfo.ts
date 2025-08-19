"use server"

import { getDemo } from "@db/actions"
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

  const isDemo = await getDemo()
  if (isDemo || !data || data.length === 0) {
    return dummyData
  }
  return data
}

const dummyData = [
  {
    pending_custody_close_requests: 2,
    done_custody_close_requests: 3,
    refuse_cancel_custody_close_requests: 2,
    all_custody_close_requests: 7,
  },
]
