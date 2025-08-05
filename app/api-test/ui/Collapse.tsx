"use client"

import { Animate } from "@components"
import { ChevronsDownUpIcon, ChevronsUpDownIcon } from "lucide-react"
import { useState } from "react"
import { twMerge } from "tailwind-merge"

export const Collapse = ({ children = <></>, title = "", className = "" }) => {
  const [childrenVisible, setChildrenVisible] = useState(true)

  return (
    <div
      dir="ltr"
      className={twMerge(
        "border border-white/50 rounded-md px-2 pt-1",
        childrenVisible && "pb-4",
        className,
      )}
    >
      <button
        dir="ltr"
        className="flex items-center justify-between gap-2 w-full border-b border-1 border-white/50"
        onClick={() => setChildrenVisible(!childrenVisible)}
      >
        <h2 dir="ltr" className="text-2xl font-bold py-4 ">
          {title}
        </h2>
        {childrenVisible && (
          <ChevronsDownUpIcon className="w-6 h-6 text-white" />
        )}
        {!childrenVisible && (
          <ChevronsUpDownIcon className="w-6 h-6 text-white" />
        )}
      </button>
      <Animate>{childrenVisible ? children : null}</Animate>
    </div>
  )
}
