"use client"

import { getSession } from "@server"
import { usePathname, useRouter } from "next/navigation"
import { useEffect } from "react"

export const ValidateSession = () => {
  const router = useRouter()
  const pathName = usePathname()

  const init = async () => {
    const session = await getSession()
    // console.log({ pathName })
    if (!session) {
      router.push(`./${pathName}`)
    }
  }

  useEffect(() => {
    init()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathName])

  return null
}
