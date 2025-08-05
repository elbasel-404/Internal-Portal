"use client"

import { Inputs } from "../ui/Inputs"
import { InputData } from "../types/InputData"
import { Collapse } from "../ui/Collapse"
import { useAtomValue } from "jotai"
import { requestBodyAtom } from "@api/atoms/requestBodyAtom"
import { useEffect } from "react"

export const RequestBody = ({ body: body }: { body: InputData[] }) => {
  const requestBody = useAtomValue(requestBodyAtom)

  useEffect(() => {
    console.log({ requestBody })
  }, [requestBody])

  useEffect(() => {
    console.log({ requestBody })
  }, [])

  return (
    <Collapse title="Request Body" className="flex-1">
      <Inputs
        showPlusIcon={true}
        keyPrefix="request-body"
        enteries={[...body, ...requestBody]}
      />
    </Collapse>
  )
}
