import { endpointsUrls } from "@api/lib/endpointsUrls"
import { InputData } from "@api/types/InputData"
import { atom } from "jotai"

export const requestBodyAtom = atom<InputData[]>(
  endpointsUrls[0].requestBody as unknown as InputData[],
)
