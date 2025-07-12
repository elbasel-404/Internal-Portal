import { ArrowLeftToLineIcon, ArrowRightToLineIcon } from "@icons"
import Image from "next/image"
import { Dispatch, SetStateAction } from "react"
import { SidebarProfileInfo } from "./SidebarProfileInfo"
import { ProfileInfo } from "@types"

interface SideBarHeaderProps {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  userInfo: ProfileInfo
}

export const SidebarHeader = ({
  isOpen,
  setIsOpen,
  userInfo,
}: SideBarHeaderProps) => {
  return (
    <>
      <div className="absolute top-0 left-0">
        <Image
          src="/images/monshaat-logo.svg"
          alt="logo"
          width={110}
          height={120}
        />
      </div>

      <div className={`absolute ${isOpen ? "top-4 left-3" : "-top-4 left-0"}`}>
        {!isOpen ? (
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="text-white focus:outline-none flex items-center px-5 my-8"
          >
            <ArrowLeftToLineIcon />
          </button>
        ) : (
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="text-white focus:outline-none flex items-center justify-center"
          >
            <ArrowRightToLineIcon />
          </button>
        )}
      </div>

      {/* Logo Section */}
      {isOpen && (
        <div className="flex flex-col items-center space-y-2 mb-4 mt-32">
          <div className="flex items-center gap-2 px-5">
            <Image
              src="/images/monshaat-title.svg"
              alt="title"
              width={250}
              height={112}
            />
          </div>
        </div>
      )}

      <SidebarProfileInfo isOpen={isOpen} userInfo={userInfo} />
    </>
  )
}
