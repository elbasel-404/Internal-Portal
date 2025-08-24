"use client"

import { isSideBarOpenAtom } from "@atoms"
import { cn } from "@utils"
import { useAtomValue } from "jotai"
import { Animate } from "../Animate"
import { InfoCard } from "./InfoCard"
import { GeneralInfoKeysObject } from "../RequestGeneralData/types/GeneralInfoKeysObject"

interface InfoGridProps {
  info: GeneralInfoKeysObject
  className?: string
}

export const InfoGrid = ({ info, className }: InfoGridProps) => {
  const isSideBarOpen = useAtomValue(isSideBarOpenAtom)
  const cardCount = Object.entries(info).length

  return (
    <Animate className={cn("flex flex-wrap gap-6", className)}>
      {Object.entries(info).map(([key, value]) => {
        return (
          <div
            key={key}
            className={cn(
              "md:flex-grow-[1] w-full transition-all duration-500",
              cardCount > 4 ? "w-[calc(30%-24px)]" : "w-[calc(50%-24px)]",
            )}
          >
            <InfoCard title={key} count={value} isSideBarOpen={isSideBarOpen} />
          </div>
        )
      })}
    </Animate>
  )
}
