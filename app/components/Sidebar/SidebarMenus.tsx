import { cn } from "@utils"
import { MenuItem } from "./MenuItem"
import { MenuItems } from "./config"

interface SideBarMenusProps {
  isOpen: boolean
}

export const SidebarMenus = ({ isOpen }: SideBarMenusProps) => {
  return (
    <div
      className={cn("grid w-full", {
        "grid-cols-2 mt-4": isOpen,
        "grid-cols-1 mt-2": !isOpen,
      })}
    >
      {MenuItems.map((menuItem, index) => (
        <MenuItem
          key={index}
          iconKey={menuItem.iconKey}
          label={menuItem.label}
          href={menuItem.href}
          isOpen={isOpen}
          hasSubMenu={menuItem.hasSubMenu}
          subMenuItems={menuItem.subMenuItems}
        />
      ))}
    </div>
  )
}
