"use server"

import { getDemo } from "@db/actions"
import { getFetchHeaders } from "../../server/getFetchHeaders"
import { RequestGeneralInfoModel } from "./types/RequestGeneralInfoModel"
import type { GeneralInfoKeysObject } from "./types/GeneralInfoKeysObject"

interface GetGeneralInfoParams {
  model: RequestGeneralInfoModel
}

const apiRootUrl = process.env.API_ROOT_URL

export const getGeneralInfo = async ({
  model,
}: GetGeneralInfoParams): Promise<GeneralInfoKeysObject> => {
  // return dummyData
  const isDemo = await getDemo()
  if (isDemo) {
    return dummyData
  }
  const { headers } = await getFetchHeaders()
  const fetchUrl = `${apiRootUrl}/api/po/statistics`
  const response = await fetch(fetchUrl, {
    method: "POST",
    headers,
    body: JSON.stringify({ model }),
  })
  const json = await response.json()
  const result = json.result
  const data = result.data[0] as GeneralInfoKeysObject

  return data
}

const dummyData = {
  current_holidays_stock: 15,
  old_holidays_stock: 5,
  pending_holidays_requests: 2,
  done_holidays_requests: 10,
  refused_cancelled_holidays_requests: 1,
  all_holidays: 13,
}
