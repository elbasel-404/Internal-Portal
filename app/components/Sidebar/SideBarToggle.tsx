"use client"

import { useSetAtom } from "jotai"
import { Columns2 as ColumnsIcon } from "lucide-react"
import { isSideBarOpenAtom } from "@atoms"
import { useIsMobile } from "@hooks"
import { Button } from "@ui"

export const SideBarToggle = () => {
  const setIsOpen = useSetAtom(isSideBarOpenAtom)
  const isMobile = useIsMobile()

  if (!isMobile) return null

  return (
    <Button
      size="icon"
      variant="ghost"
      onClick={() => setIsOpen((prev) => !prev)}
      className="fixed bg-primary rounded-full h-12 w-12 right-4 bottom-4 shadow-lg transition-transform transform hover:scale-125"
    >
      <ColumnsIcon className="text-white" />
    </Button>
  )
}
