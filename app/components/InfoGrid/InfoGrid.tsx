"use client"

import React from "react"
import { isSideBarOpenAtom } from "@atoms"
// import type { GeneralInfo } from "@types"
import { cn } from "@utils"
import { useAtomValue } from "jotai"
import { Animate } from "../Animate"
import { InfoCard } from "./InfoCard"

interface InfoGridProps {
  info: Record<string, string>
  className?: string
}

export const InfoGrid = ({ info, className }: InfoGridProps) => {
  const isSideBarOpen = useAtomValue(isSideBarOpenAtom)

  return (
    <Animate
      className={cn(
        // 'grid lg:grid-cols-3 gap-6 grid-cols-1 sm:grid-cols-2',
        "flex flex-wrap gap-6",
        className,
      )}
    >
      {Object.entries(info).map(([key, value]) => {
        return (
          <div
            key={key}
            className="md:flex-grow-[1] w-full md:w-[calc(50%-24px)] lg:w-[calc(30%-24px)] transition-all duration-500 "
          >
            <InfoCard title={key} count={value} isSideBarOpen={isSideBarOpen} />
          </div>
        )
      })}
    </Animate>
  )
}
