import type { HomePageSlotKey } from "@types"
import { Fragment, type ReactNode } from "react"
import { DragAndDrop } from "../components/DragAndDrop"
import { unDraggableKeys } from "../config"

export const dynamic = "force-dynamic"

interface RenderLayoutProps {
  slotsToRender: { key: HomePageSlotKey; node: ReactNode }[]
  children: ReactNode
  userId?: number
  visuallyHiddenKeys?: HomePageSlotKey[]
}

export const renderLayout = ({
  slotsToRender,
  children,
  userId,
  visuallyHiddenKeys,
}: RenderLayoutProps) => {
  const renderDraggableSlots = async () => {
    const draggableSlots = slotsToRender.filter(
      ({ key }) => !unDraggableKeys.includes(key),
    )
    return (
      <DragAndDrop
        indexOffset={unDraggableKeys.length}
        visuallyHiddenKeys={visuallyHiddenKeys}
        userId={userId}
        slots={draggableSlots}
        className="space-y-6"
      />
    )
  }

  const renderUnDraggableSlots = () => {
    const unDraggableSlots = slotsToRender.filter(({ key }) =>
      unDraggableKeys.includes(key),
    )
    return unDraggableSlots.map(({ node, key }) => (
      <Fragment key={key}>{node}</Fragment>
    ))
  }

  return (
    <>
      {renderUnDraggableSlots()}
      {renderDraggableSlots()}
      {children}
    </>
  )
}
