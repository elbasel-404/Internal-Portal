import useSWR, { Fetcher } from "swr"
import { VacationRequest } from "@types"
import { getVacationRequests } from "../../server/getVacationRequests"

const fetcher: Fetcher<VacationRequest[]> = async () => {
  // url parameter not used since we're calling a direct function
  const requests = await getVacationRequests()
  return requests
}
// fetch(url).then((res) => res.json());

export const useVacationRequests = () => {
  const { data, error, isLoading } = useSWR("api/getVacationRequests", fetcher)

  return { data, error, isLoading }
}
