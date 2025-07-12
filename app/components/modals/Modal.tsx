"use client"

import { VisuallyHidden } from "@components"
// import { useKeyPress } from '@hooks';
import {
  Dialog,
  //   Input,
  // DialogFooter,
  //   Label,
  DialogClose,
  DialogContent,
  DialogDescription,
  //   DialogTrigger,
  //   Button,
  // DialogContent,
  // DialogHeader,
  DialogTitle,
} from "@ui"
import { cn, sleep } from "@utils"
import { useRouter } from "next/navigation"
import { MouseEvent, useEffect, useState, type ReactNode } from "react"

interface ModalProps {
  children?: ReactNode
  onModalOpen?: () => void
  onModalClose?: () => Promise<void>
  handleClickCapture?: (event: MouseEvent<HTMLDivElement>) => void
  handleClickInternally?: boolean
  refreshOnClose?: boolean
  // onOpenChange?: (isOpen: boolean) => void;
  modalDescription?: string

  initialOverlayClassName?: string
  outroOverlayClassName?: string
  introOverlayClassName?: string

  initialContentClassName?: string
  introContentClassName?: string
  outroContentClassName?: string
}

const defaultOverlayClassName =
  "fixed inset-0 z-40 flex items-center justify-center bg-black/80 overflow-hidden transform duration-500"
const defaultContentCLassName =
  "p-5 w-fit h-[95vh] overflow-hidden bg-white rounded-3xl z-50 inset-0 fixed mx-auto my-auto transform duration-500"

const defaultOverlayIntroClassName = "animate-in fade-in-0"
const defaultContentIntroClassName = "animate-in fade-in-0"

const defaultOverlayOutroClassName = "animate-out fade-out-0"
const defaultContentOutroClassName = "animate-out fade-out-0"

export const Modal = ({
  children,
  onModalOpen,
  onModalClose,
  // onOpenChange,
  refreshOnClose = true,
  modalDescription = "",

  initialContentClassName,
  introContentClassName,
  outroContentClassName,

  initialOverlayClassName,
  introOverlayClassName,
  outroOverlayClassName,
}: ModalProps) => {
  const contentClassName = cn(
    defaultContentCLassName,
    defaultContentIntroClassName,
    initialContentClassName,
    introContentClassName,
  )

  const overlayClassName = cn(
    defaultOverlayClassName,
    defaultOverlayIntroClassName,
    initialOverlayClassName,
    introOverlayClassName,
  )

  const [currentContentClassName, setCurrentContentClassName] =
    useState(contentClassName)

  const [currentOverlayClassName, setCurrentOverlayClassName] =
    useState(overlayClassName)

  const router = useRouter()

  const closeDialog = async () => {
    if (onModalClose) await onModalClose()
    const contentClassName = cn(
      currentContentClassName,
      defaultContentOutroClassName,
      outroContentClassName,
    )
    const overlayClassName = cn(
      currentOverlayClassName,
      defaultOverlayOutroClassName,
      outroOverlayClassName,
    )
    setCurrentContentClassName(contentClassName)
    setCurrentOverlayClassName(overlayClassName)
    await sleep(0.45)

    // if (handleClickInternally) await sleep(2);
    if (typeof window === "undefined") return
    const path = window.location.href
    if (path.includes("modal")) router.back()
  }

  useEffect(() => {
    return () => {
      if (refreshOnClose) router.refresh()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // if (!modalOpen) return null;

  return (
    <Dialog open={true}>
      <VisuallyHidden>
        <DialogTitle title="User Settings" />
        <DialogDescription description={modalDescription} />
      </VisuallyHidden>
      <DialogContent
        // onCloseAunmouutoFocus={closeDialog}
        // onInteractOutside={closeDialog}
        onOpenAutoFocus={onModalOpen}
        onEscapeKeyDown={closeDialog}
        onPointerDownOutside={closeDialog}
        className={currentContentClassName}
        overlayClassName={currentOverlayClassName}
      >
        {children}
      </DialogContent>
      <DialogClose asChild>Close</DialogClose>
    </Dialog>
  )
}
