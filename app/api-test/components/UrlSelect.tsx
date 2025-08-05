"use client"

import { requestBodyAtom } from "@api/atoms/requestBodyAtom"
import { endpointsUrls } from "@api/lib/endpointsUrls"
import { InputData } from "@api/types/InputData"
import { useSetAtom } from "jotai"

export const UrlSelect = () => {
  const setRequestBody = useSetAtom(requestBodyAtom)

  return (
    <select
      defaultValue={endpointsUrls[0].url}
      onChange={(e) => {
        const selectedUrl = endpointsUrls.find(
          (endpoint) => endpoint.url === e.target.value,
        )
        if (selectedUrl) {
          setRequestBody(selectedUrl.requestBody as unknown as InputData[])
        }
      }}
      name="url"
      className="w-full px-4 py-2 text-white bg-black border rounded-xl border-white/50"
    >
      {endpointsUrls.map(({ url }) => (
        <option key={url} value={url}>
          {url}
        </option>
      ))}
    </select>
  )
}
