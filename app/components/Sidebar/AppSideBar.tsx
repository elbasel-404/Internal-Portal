"use client"

import { isSideBarOpenAtom } from "@atoms"
import { cn } from "@utils"
import { useAtom } from "jotai"
import { Dispatch, SetStateAction, useCallback } from "react"
import { useIsMobile } from "../../hooks/useIsMobile"
import { SidebarContent } from "./SidebarContent"
import { SideBarToggle } from "./SideBarToggle"
import { ProfileInfo } from "@types"
interface SidebarProps {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  userInfo: ProfileInfo
}
interface AppSideBarProps {
  userInfo: ProfileInfo
}

// Main App Sidebar component
export const AppSideBar = ({ userInfo }: AppSideBarProps) => {
  const [isOpen, setIsOpen] = useAtom(isSideBarOpenAtom)
  const isMobileScreen = useIsMobile()

  const Sidebar = isMobileScreen ? MobileSidebar : DesktopSidebar

  return (
    <div
      className={cn(
        "fixed right-0 top-0 z-10 h-screen overflow-y-auto app-scrollbar",
      )}
    >
      <SideBarToggle />
      <Sidebar isOpen={isOpen} userInfo={userInfo} setIsOpen={setIsOpen} />
    </div>
  )
}

// Desktop Sidebar
const DesktopSidebar = ({ isOpen, setIsOpen, userInfo }: SidebarProps) => (
  <div className="hidden h-full lg:block">
    <div
      className={`bg-sidebar transition-all duration-500 min-h-screen ${
        isOpen ? "w-[280px]" : "w-[71px]"
      } flex flex-col`}
    >
      <SidebarContent
        isOpen={isOpen}
        userInfo={userInfo}
        setIsOpen={setIsOpen}
      />
    </div>
  </div>
)

// Mobile Sidebar
const MobileSidebar = ({ isOpen, setIsOpen, userInfo }: SidebarProps) => {
  const handleBackdropClick = useCallback(() => setIsOpen(false), [setIsOpen])

  return (
    <div>
      {isOpen && <Backdrop onClick={handleBackdropClick} />}
      <div
        className={cn(
          "fixed top-0 right-0 w-[300px] h-full bg-sidebar shadow-[0_4px_10px_0_rgba(0,0,0,0.8)] z-10 duration-300 flex flex-col",
          {
            "pt-8 p-3 overflow-y-auto app-scrollbar": isOpen,
            "right-[-100%]": !isOpen,
          },
        )}
      >
        <SidebarContent
          isOpen={isOpen}
          userInfo={userInfo}
          setIsOpen={setIsOpen}
        />
      </div>
    </div>
  )
}

// Mobile Backdrop Component
const Backdrop = ({ onClick }: { onClick: () => void }) => (
  <div
    className="fixed top-0 left-0 z-10 w-full h-full min-h-screen bg-black/60"
    onClick={onClick}
    aria-hidden="true"
  />
)
