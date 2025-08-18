"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import type { ReactNode } from "react"
import { twMerge } from "tailwind-merge"

interface ButtonLinkProps {
  href: string
  children: ReactNode
  activeUrls: string[]
}

export const ButtonLink = ({ href, children, activeUrls }: ButtonLinkProps) => {
  const pathName = usePathname()
  const active = activeUrls.includes(pathName)

  return (
    <Link
      href={href}
      className={twMerge(
        "flex items-center gap-2 hover:ring focus:ring bg-[#007497]/10 ring-black transition-all cursor-pointer drop-shadow-lg w-fit p-4 rounded-lg",
        active && "bg-[#007497]/20 text-[#007C9E] ",
      )}
    >
      <span
        className={twMerge(
          "rounded-full flex items-center justify-center border-2 border-[#7996B9] w-5 h-5",
          active && "border-[#007C9E]",
        )}
      >
        {active && (
          <span className="block w-2.5 h-2.5 rounded-full bg-[#007C9E]" />
        )}
      </span>
      <span>{children}</span>
    </Link>
  )
}
