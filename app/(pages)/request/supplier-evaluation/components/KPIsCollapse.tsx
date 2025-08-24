"use client"

import { Animate } from "@components"
// Removed unused imports: animations, ParentConfig
import {} from "@formkit/drag-and-drop"
import { CircleMinusIcon } from "@icons"
import { cn } from "@utils"
import { RefObject, useRef, useState, type ReactNode } from "react"

type Slot = {
  node: ReactNode
  key: string
  title?: string
}
interface KPIsCollapseProps {
  slots: Slot[]
  className?: string
  visuallyHiddenKeys?: string[]
}

const defaultClassName = ""

export const KPIsCollapse = ({
  slots,
  className,
  visuallyHiddenKeys,
}: KPIsCollapseProps) => {
  // ! ===============================================================
  // ! Config
  // ! ===============================================================
  // Commented out unused variable
  // const config: Partial<ParentConfig<{ node: ReactNode; key: string }>> = {
  //   plugins: [animations()],
  // }

  // ! ===============================================================
  // ! State
  // ! ===============================================================
  const [collapsedSlots, setCollapsedSlots] = useState<string[]>([])
  const parent = useRef<HTMLDivElement>(null)

  // ! ===============================================================
  // ! Rendering
  // ! ===============================================================
  const renderSlot = ({ key, node, title }: Slot, className?: string) => {
    const isCollapsed = collapsedSlots.includes(key)
    return (
      <Animate
        key={key}
        className={`${key}-slot ${key} slot ${className} overflow-hidden`}
        data-key={key}
      >
        {renderTitle({ key, title: title || "" })}
        {!isCollapsed && node}
      </Animate>
    )
  }

  const renderTitle = ({ key, title }: { key: string; title: string }) => {
    return (
      <div className="flex border-r-4 border-[#007497]">
        <div className="bg-[#007C9E24] flex gap-2 slotHandle p-4 flex-1">
          <h2 className="text-2xl font-bold">{title}</h2>
        </div>
        <button
        title="button"
          className="flex flex-[0.07] items-center justify-center bg-[#007C9E24]"
          onClick={() => {
            setCollapsedSlots((prev) => {
              if (prev.includes(key)) {
                return prev.filter((k) => k !== key)
              }
              return [...prev, key]
            })
          }}
        >
          <CircleMinusIcon />
        </button>
      </div>
    )
  }

  return (
    <div
      ref={parent as RefObject<HTMLDivElement>}
      className={cn(defaultClassName, className)}
    >
      {slots.map(
        ({
          key,
          node,
          title,
        }: {
          key: string
          node?: ReactNode
          title?: string | undefined
        }) => {
          const hidden = visuallyHiddenKeys?.includes(key)
          if (!node) return null // Ensure node is defined
          return renderSlot({ key, node, title }, hidden ? "hidden" : "")
        },
      )}
    </div>
  )
}
