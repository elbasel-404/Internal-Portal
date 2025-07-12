"use client"

import { EditIcon } from "@icons"
import { LogOutIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { paths } from "../../lib/paths"
import { Button } from "../../ui/button"
import { logout } from "@auth"
import { ProfileInfo } from "@types"
interface SideBarHeaderProps {
  isOpen: boolean
  userInfo: ProfileInfo
}

export const SidebarProfileInfo = ({
  isOpen,
  userInfo,
}: SideBarHeaderProps) => {
  return (
    <>
      <div
        className={`flex flex-col justify-center items-center gap-4 ${
          isOpen && "hidden"
        }`}
      >
        <Image
          className={`w-12 h-12 rounded-full mt-32`}
          width={100}
          height={100}
          src={userInfo.image}
          alt="profile-picture"
        />
        <Link
          href={paths.userProfile.href}
          className="min-h-14 p-4 text-white font-medium bg-primary-opacity hover:bg-primary rounded-xl shadow-none"
        >
          <EditIcon />
        </Link>

        <form action={logout}>
          <Button
            type="submit"
            className="min-h-14 p-4 text-white font-medium bg-primary-opacity hover:bg-primary rounded-xl shadow-none rotate-180"
          >
            <LogOutIcon />
          </Button>
        </form>
      </div>

      <div
        className={`flex flex-col items-center justify-center w-full ${
          !isOpen && "hidden"
        }`}
      >
        <Link
          href={paths.userProfile.href}
          className="flex flex-col items-center justify-center"
        >
          <Image
            className="w-20 h-20 rounded-full"
            width={100}
            height={100}
            src={userInfo.image}
            alt="profile-picture"
          />
          <h1 className="text-2xl font-medium text-white text-center">
            {userInfo.name}
          </h1>
          <p className="font-light text-white text-base">{userInfo.job} </p>
        </Link>
        <div className="flex gap-3 mt-2">
          <Link
            href={paths.userProfile.href}
            className="w-full min-h-12 px-11 flex items-center text-white font-medium bg-primary-opacity hover:bg-primary rounded-xl shadow-none"
          >
            بياناتي
          </Link>
          <form action={logout}>
            <Button className="w-full min-h-12 text-white font-medium bg-primary-opacity hover:bg-primary rounded-xl shadow-none rotate-180">
              <LogOutIcon />
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}
