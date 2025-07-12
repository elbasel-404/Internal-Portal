import { Dispatch, SetStateAction } from "react"
import { AppSection } from "./AppSection"
import { SidebarHeader } from "./SidebarHeader"
import { SidebarMenus } from "./SidebarMenus"
import { ProfileInfo } from "@types"
interface SideBarContentProps {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  userInfo: ProfileInfo
}

export const SidebarContent = ({
  isOpen,
  setIsOpen,
  userInfo,
}: SideBarContentProps) => {
  return (
    <>
      <SidebarHeader
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        userInfo={userInfo}
      />
      <SidebarMenus isOpen={isOpen} />
      <AppSection isOpen={isOpen} />
    </>
  )
}
