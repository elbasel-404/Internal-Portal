import { SidebarHeader } from "./SidebarHeader"
import { SidebarMenus } from "./SidebarMenus"

interface SideBarContentProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

export const SidebarContent = ({ isOpen, setIsOpen }: SideBarContentProps) => {
  return (
    <>
      <SidebarHeader isOpen={isOpen} setIsOpen={setIsOpen} />
      <SidebarMenus isOpen={isOpen} />
    </>
  )
}
