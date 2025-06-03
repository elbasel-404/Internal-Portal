import { MenuItem } from "./MenuItem"
import { MenuItems } from "./config"

interface SideBarMenusProps {
  isOpen: boolean
}

export const SidebarMenus = ({ isOpen }: SideBarMenusProps) => {
  return (
    <div className="flex flex-col space-y-4 w-full px-2 mb-4">
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
