"use client"

import { ModalLink } from "@components/modals/ModalLink"
import { GearIcon, HelloIcon, SearchIcon } from "@icons"
import { getNotifications } from "@server"
import { Button, Input } from "@ui"
import { MegaMenu } from "./MegaMenu"
import { NavBarPadding } from "./NabBarPadding"
import { Notification } from "./Notification"
import { useEffect, useState } from "react"
import { NotificationItem, ProfileInfo } from "@types" // Adjust the import path as needed

interface userProps {
  userInfo: ProfileInfo
}

export const NavBar = ({ userInfo }: userProps) => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([])

  const loadNotifications = async () => {
    const newNotifications = await getNotifications()
    setNotifications(newNotifications)
  }
  useEffect(() => {
    loadNotifications()
  }, [])

  return (
    <nav className={"flex items-center bg-white p-4 lg:px-16"}>
      {/* ! Padding is in this component: */}
      <NavBarPadding />
      <div className="ml-auto flex items-center gap-4">
        {/* <ProfileInfo /> */}
        <div className="hidden gap-1 sm:flex md:items-center">
          <h1 className="text-2xl font-bold">
            طاب مسائك، {userInfo.name?.split(" ")[0]}
          </h1>
          <HelloIcon />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="hidden md:block">
          <Input
            variant="icon"
            placeholder="اكتب كلمة البحث"
            className="text-sm placeholder:text-foreground shadow-none pr-10"
            icon={<SearchIcon />}
          />
        </div>
        <MegaMenu />
        {/* <Settings /> */}
        <ModalLink name="HomePageSettingsModal">
          <Button
            className="bg-secondary shadow-none hover:bg-secondary"
            size="icon"
            icon={<GearIcon />}
          />
        </ModalLink>
        <Notification notifications={notifications} />
        {/* <ThemeToggle /> */}
      </div>
    </nav>
  )
}
