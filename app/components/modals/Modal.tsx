"use client"

import { isSideBarOpenAtom } from "@atoms"
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
import { useSetAtom } from "jotai"
import { Route } from "next"
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
  handleClickCapture,
  handleClickInternally = false,
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

  const [modalOpen, setModalOpen] = useState(true)
  const [currentContentClassName, setCurrentContentClassName] =
    useState(contentClassName)

  const [currentOverlayClassName, setCurrentOverlayClassName] =
    useState(overlayClassName)

  const router = useRouter()
  const setSideBarOpen = useSetAtom(isSideBarOpenAtom)

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
    setModalOpen(false)

    // if (handleClickInternally) await sleep(2);
    if (typeof window === undefined) return
    const path = window.location.href
    console.log({ path })
    if (path.includes("modal")) router.back()
  }

  useEffect(() => {
    return () => {
      if (refreshOnClose) router.refresh()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // ! TODO Move this to modal components instead
  const internalHandleClickCapture = async (
    event: MouseEvent<HTMLDivElement>,
  ) => {
    if (!handleClickInternally) return
    const target = event.target
    const tagName = (target as HTMLElement).tagName

    console.log({ tagName })
    if (tagName === "BUTTON") return
    event.preventDefault()
    let linkElement
    if (["DIV", "svg", "A", "path"].includes(tagName)) {
      const isDivElement = tagName === "DIV"
      const isLinkElement = tagName === "A"
      const isSvgElement = tagName === "svg"
      const isPathElement = tagName === "path"

      if (isDivElement) {
        linkElement = (target as HTMLElement).parentElement
      }
      if (isPathElement) {
        const parentSvg = (target as HTMLElement).parentElement
        const parentDiv = (parentSvg as HTMLElement).parentElement
        linkElement = parentDiv?.parentElement
      }
      if (isSvgElement) {
        const parentDiv = (target as HTMLElement).parentElement
        linkElement = parentDiv?.parentElement
      }
      if (isLinkElement) {
        linkElement = target
      }
      const pushHref = (linkElement as HTMLElement)?.getAttribute("href")
      console.log({ pushHref })
      router.back()
      await sleep(0.1)
      router.push(pushHref as Route)
      setSideBarOpen(false)
    }
  }

  // if (!modalOpen) return null;

  return (
    <Dialog open={modalOpen}>
      <VisuallyHidden>
        <DialogTitle title="User Settings" />
        <DialogDescription description={modalDescription} />
      </VisuallyHidden>
      <DialogContent
        onClickCapture={handleClickCapture || internalHandleClickCapture}
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
