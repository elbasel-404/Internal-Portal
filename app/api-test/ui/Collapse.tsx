"use client"

import { twMerge } from "tailwind-merge"

export const Collapse = ({ children = <></>, title = "", className = "" }) => {
  return (
    <div
      dir="ltr"
      className={twMerge(
        "border border-white/50 rounded-md px-2 pt-1",
        className,
      )}
    >
      <h2 dir="ltr" className="py-4 text-2xl font-bold ">
        {title}
      </h2>
      {children}
    </div>
  )
}
