"use client"

import { isSideBarOpenAtom } from "@atoms"
import { useAtom, useSetAtom } from "jotai"
import { ChevronDown } from "lucide-react"
import type { Route } from "next"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { IconKey, SidebarIcons } from "./SidebarIcons"

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
  subMenuItems = [],
}: MenuItemProps) => {
  const Icon = SidebarIcons[iconKey]
  const setSideBarOpen = useSetAtom(isSideBarOpenAtom)
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false)
  const [isSidebarOpen] = useAtom(isSideBarOpenAtom)
  const submenuRef = useRef<HTMLDivElement>(null)

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
        onClick={() => !hasSubMenu && setSideBarOpen(false)}
      >
        <div
          className={`flex items-center ${
            isOpen ? "justify-between w-full" : "justify-center w-fit"
          } text-white hover:bg-primary hover:border-r-[3px] hover:border-[#88D0EC] p-3 cursor-pointer`}
          onClick={toggleSubMenu}
        >
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            {Icon}
            {isOpen && <span className="font-medium">{label}</span>}
          </div>
          {hasSubMenu && isOpen && (
            <span className="text-xs">
              <ChevronDown
                size={14}
                className={`transition-transform duration-300 ${
                  isSubMenuOpen ? "rotate-180" : ""
                }`}
              />
            </span>
          )}
        </div>
      </Link>
      {hasSubMenu && (
        <div
          ref={submenuRef}
          className={`transition-all duration-500 overflow-hidden`}
          style={{
            maxHeight: isSubMenuOpen
              ? `${submenuRef.current?.scrollHeight}px`
              : "0px",
          }}
        >
          <div className="bg-[#263454] mt-2 space-y-1">
            {subMenuItems.map((subItem, index) => (
              <MenuItem
                key={index}
                iconKey={subItem.iconKey}
                label={subItem.label}
                href={subItem.href}
                hasSubMenu={subItem.hasSubMenu}
                subMenuItems={subItem.subMenuItems}
                isOpen={isSidebarOpen}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
