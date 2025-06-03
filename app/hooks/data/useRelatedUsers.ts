import useSWR, { Fetcher } from "swr"
import { RelatedUser } from "@types"

const fetcher: Fetcher<RelatedUser[]> = (url: string) =>
  fetch(url).then((res) => res.json())

export const useRelatedUsers = () => {
  const { data, error, isLoading } = useSWR("api/getRelatedUsers", fetcher)

  return { data, error, isLoading }
}
