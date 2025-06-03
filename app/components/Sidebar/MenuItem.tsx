"use client"

import { isSideBarOpenAtom } from "@atoms"
import type { IconKey } from "@types"
import { useAtom } from "jotai"
import type { Route } from "next"
import Link from "next/link"
import { useEffect, useState } from "react"
import { SidebarIcons } from "./SidebarIcons"

interface MenuItemProps {
  iconKey: IconKey
  label: string
  href?: Route
  isOpen?: boolean
  hasSubMenu?: boolean
  subMenuItems?: MenuItemProps[]
}

export const MenuItem = ({
  iconKey,
  label,
  href,
  isOpen,
  hasSubMenu = false,
}: MenuItemProps) => {
  const Icon = SidebarIcons[iconKey]
  // const setSideBarOpen = useSetAtom(isSideBarOpenAtom);
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false)
  const [isSidebarOpen, setSidebarOpen] = useAtom(isSideBarOpenAtom)

  const toggleSubMenu = () => {
    if (hasSubMenu) setIsSubMenuOpen(!isSubMenuOpen)
    if (!isSidebarOpen) setIsSubMenuOpen(false)
  }

  useEffect(() => {
    if (!isSidebarOpen) setIsSubMenuOpen(false)
  }, [isSidebarOpen])

  return (
    <div className="flex flex-col">
      <Link
        href={href || "#"}
        onClick={() => !hasSubMenu && setSidebarOpen(false)}
      >
        <div
          className={`flex items-center justify-center w-full text-white p-2 cursor-pointer`}
          onClick={toggleSubMenu}
        >
          <div className="flex flex-col gap-2 items-center justify-center">
            <div
              className={`${isOpen ? "p-4" : "p-2"} ${
                isOpen && iconKey === "DownloadApp" && "hidden"
              } rounded-xl bg-primary-opacity`}
            >
              {Icon}
            </div>
            {isOpen && (
              <span className="font-bold text-sm text-center">{label}</span>
            )}
          </div>
        </div>
      </Link>
    </div>
  )
}
