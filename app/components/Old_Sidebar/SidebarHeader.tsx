import Image from "next/image"
import { ArrowLeftToLineIcon, ArrowRightToLineIcon } from "@icons"

interface SideBarHeaderProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

export const SidebarHeader = ({ isOpen, setIsOpen }: SideBarHeaderProps) => {
  return (
    <>
      {/* Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white focus:outline-none flex items-center px-5 my-8"
        >
          <ArrowRightToLineIcon />
        </button>
      )}

      {/* Logo Section */}
      {isOpen && (
        <div className="flex flex-col items-center space-y-2 mb-8 mt-4">
          <div className="flex items-center gap-2 px-5">
            <Image
              src="/images/monshaat-title.svg"
              alt="title"
              width={120}
              height={120}
            />
            <Image
              src="/images/monshaat-logo.svg"
              alt="logo"
              width={150}
              height={150}
            />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white focus:outline-none flex items-center justify-center"
            >
              <ArrowLeftToLineIcon />
            </button>
          </div>
        </div>
      )}
    </>
  )
}
