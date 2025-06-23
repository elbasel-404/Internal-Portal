// app/components/Breadcrumbs.tsx
"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { modalPaths, paths } from "@lib"
import { getPathTitle } from "@utils"
import { NavBarPadding } from "./Navbar/NabBarPadding"
import { Route } from "next"

const modalHrefs: string[] = Object.values(modalPaths).map((p) => p.href)

export const Breadcrumbs = () => {
  const currentPath = usePathname()
  const [prevPath, setPrevPath] = useState<Route>()
  const [currentPathTitle, setCurrentPathTitle] = useState<string | null>(null)
  const isTestHref = currentPath.includes("test")
  const isNotificationHref = currentPath.includes("notification")

  useEffect(() => {
    const currentTitle = getPathTitle(currentPath)
    const isModalHref = modalHrefs.includes(currentPath)
    if (isTestHref) return
    if (isModalHref) return
    if (prevPath !== currentPath) {
      setPrevPath(currentPath as Route)
      if (!currentTitle) return
      setCurrentPathTitle(currentTitle)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPath])

  if (isTestHref) return null
  if (isNotificationHref) return null
  if (!currentPathTitle) return null
  if (prevPath === paths.home.href) return null

  return (
    <div className="text-[#354A64] flex gap-1 bg-white py-2 lg:px-16 px-4 md:px-8 text-sm border-t border-black/5">
      <NavBarPadding className="h-0" />
      <span>
        <Link href="/">الرئيسية</Link>
      </span>
      {" / "}
      <span>
        <Link href={prevPath || "#"}>{currentPathTitle}</Link>
      </span>
    </div>
  )
}
