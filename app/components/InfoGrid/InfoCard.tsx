import { ArrowButton } from "@components/buttons"
import type { GeneralInfo } from "@types"
import { cn } from "@utils"
import { ElementType } from "react"
import { getIconNode } from "./utils"
import { infoIcons } from "./config"

interface InfoCard {
  info: GeneralInfo
  isSideBarOpen?: boolean
  iconName?: keyof typeof infoIcons
  rootBgColor?: string
}

export const InfoCard = ({
  info,
  isSideBarOpen,
  iconName,
  rootBgColor,
}: InfoCard) => {
  const {
    backgroundColor,
    count,
    icon,
    link,
    title,
    buttonName,
    iconTextColor,
  } = info

  const IconNode = getIconNode(iconName ?? icon) as ElementType

  return (
    <div
      className="flex gap-2.5 lg:items-end justify-between bg-white rounded-2xl p-4 h-[92px]"
      style={{ backgroundColor: rootBgColor }}
    >
      <div className="flex items-center gap-4 lg:w-full">
        {/* Icon Section */}
        <div
          style={{
            backgroundColor,
            color: iconTextColor,
          }}
          className={`p-3 rounded-2xl`}
        >
          <IconNode />
        </div>
        {/* Title and Count Section */}
        <div className="flex lg:gap-10 justify-between relative">
          <div className="flex flex-col">
            <p className="text-lg min-w-max font-medium absolute">{title}</p>
            <p className="text-3xl font-bold mt-8">{count}</p>
          </div>
        </div>
      </div>
      {link && (
        <ArrowButton
          className={cn(
            "mr-auto flex-1 flex items-end justify-end py-2",
            isSideBarOpen && "lg:mr-0",
          )}
          title={buttonName || "تفاصيل"}
          bgButtonColor="bg-secondary"
        />
      )}
    </div>
  )
}
