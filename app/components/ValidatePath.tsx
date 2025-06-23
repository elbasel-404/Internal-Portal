// app/components/validatePath.tsx
"use client"

// import { ErrorMessage } from '@lib';
import { usePathname } from "next/navigation"
import { useEffect } from "react"
import { getHrefs } from "../server/getHrefs"
import { getRegExFromHref } from "../server/getRegExFromHref"

export const ValidatePath = () => {
  const validate = async (shouldValidate = false) => {
    if (!shouldValidate) return
    const regExPaths = await getHrefs()

    // Removed unused 'isPath' variable
    regExPaths.some((href) => {
      const pattern = getRegExFromHref(href)
      const isMatch = pattern.test(pathName)
      return isMatch
    })
    // if (!isPath) {
    //   // Handle invalid path if needed in the future
    // }
  }
  const pathName = usePathname()

  useEffect(() => {
    if (!pathName) return
    const isTestHref = /\/test\/[A-Za-z]+/.test(pathName)
    const isNotificationHref = /\/notification\/[A-Za-z]+/.test(pathName)
    const isModalHref = /\/modal\/[A-Za-z]+/.test(pathName)
    const shouldValidate = !(isTestHref || isNotificationHref || isModalHref)

    validate(shouldValidate)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathName])

  return null
}
