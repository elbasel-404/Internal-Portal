"use client"

import { Animate } from "@components"
import { animations, type ParentConfig } from "@formkit/drag-and-drop"
import { useDragAndDrop } from "@formkit/drag-and-drop/react"
import { CircleMinusIcon } from "@icons"
import type { HomePageSlotKey } from "@types"
import { cn, getSlotTitle } from "@utils"
import { Grip as GripIcon } from "lucide-react"
import { RefObject, useEffect, useState, type ReactNode } from "react"
import { handleDrag } from "./handleDrag"

type Slot = {
  node: ReactNode
  key: HomePageSlotKey
}
interface DragAndDropProps {
  slots: Slot[]
  className?: string
  userId?: number
  visuallyHiddenKeys?: HomePageSlotKey[]
  indexOffset: number
}

const defaultClassName = ""

export const DragAndDrop = ({
  slots,
  className,
  userId,
  visuallyHiddenKeys,
  indexOffset,
}: DragAndDropProps) => {
  // ! ===============================================================
  // ! Config
  // ! ===============================================================
  const config: Partial<
    ParentConfig<{ node: ReactNode; key: HomePageSlotKey }>
  > = {
    dragHandle: ".slotHandle",
    plugins: [animations()],
    onDragstart: (dragStartData) => {
      const { position, draggedNode } = dragStartData
      const { value } = draggedNode.data
      const { key } = value as { key: HomePageSlotKey }
      setOriginIndex(position)
      setDestinationIndex(null)
      setElementKey(key)
    },
    onDragend: (dragEndData) => {
      const { draggedNode } = dragEndData
      const { data } = draggedNode
      const { index } = data
      setDestinationIndex(index)
    },
  }

  // ! ===============================================================
  // ! State
  // ! ===============================================================
  const [parent, dndNodes, setValues] = useDragAndDrop(slots, config)
  const [elementKey, setElementKey] = useState<HomePageSlotKey | null>(null)
  const [originIndex, setOriginIndex] = useState<number | null>(null)
  const [destinationIndex, setDestinationIndex] = useState<number | null>(null)
  const [collapsedSlots, setCollapsedSlots] = useState<HomePageSlotKey[]>([])

  // ! ===============================================================
  // ! Effects
  // ! ===============================================================
  useEffect(() => {
    if (destinationIndex === null) return
    if (elementKey === null) return
    if (originIndex === null) return
    handleDragEnd()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [destinationIndex])

  useEffect(() => {
    setValues(slots)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slots])

  // ! ===============================================================
  // ! Event Handlers
  // ! ===============================================================
  const handleDragEnd = async () => {
    await handleDrag({
      key: elementKey as HomePageSlotKey,
      originIndex: originIndex as number,
      destinationIndex: destinationIndex as number,
      userId,
      indexOffset,
    })
    setElementKey(null)
    setDestinationIndex(null)
    setOriginIndex(null)
  }

  // ! ===============================================================
  // ! Rendering
  // ! ===============================================================
  const renderSlot = ({ key, node }: Slot, className?: string) => {
    const isCollapsed = collapsedSlots.includes(key)
    return (
      <Animate
        key={key}
        className={`${key}-slot ${key} slot ${className} rounded-xl overflow-hidden`}
        data-key={key}
      >
        {renderTitle({ key })}
        {!isCollapsed && node}
      </Animate>
    )
  }

  const renderTitle = ({ key }: { key: HomePageSlotKey }) => {
    const title = getSlotTitle({ key, type: "homePage" })
    return (
      <div className="flex border-b border-[#ECF0F480]">
        <div className="bg-white rounded-tr-xl flex gap-2 cursor-move slotHandle p-4 flex-1">
          <GripIcon />
          <h2 className="text-2xl font-bold">{title}</h2>
        </div>
        <button
          className="flex flex-[0.07] items-center justify-center bg-white rounded-tl-xl"
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
      <Animate className="space-y-6">
        {dndNodes.map((node) => {
          const hidden = visuallyHiddenKeys?.includes(node.key)
          return renderSlot(node, hidden ? "hidden" : "")
        })}
      </Animate>
    </div>
  )
}
