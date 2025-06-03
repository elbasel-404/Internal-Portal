"use client"

import { VisuallyHidden } from "@components"
// import { useKeyPress } from '@hooks';
import {
  Dialog,
  //   DialogTrigger,
  //   Button,
  // DialogContent,
  // DialogHeader,
  DialogTitle,
  DialogDescription,
  //   Input,
  // DialogFooter,
  //   Label,
  DialogClose,
  DialogContent,
} from "@ui"
// import { cn, sleep } from '@utils';
// import { useRouter } from 'next/navigation';
import { type ReactNode } from "react"

interface ModalProps {
  children?: ReactNode
}

export const ModalCopy = ({ children }: ModalProps) => {
  return (
    // <Dialog open={modalOpen} onOpenChange={onOpenChange}> */}
    // <Dialog open={modalOpen}>
    <Dialog open={true}>
      <VisuallyHidden>
        <DialogTitle title="User Settings" />
        <DialogDescription description={"desck"} />
      </VisuallyHidden>
      <DialogContent
      // onCloseAutoFocus={closeDialog}
      // onInteractOutside={closeDialog}
      // onOpenAutoFocus={onModalOpen}
      // onEscapeKeyDown={closeDialog}
      // onPointerDownOutside={closeDialog}
      // className={currentContentClassName}
      // overlayClassName={currentOverlayClassName}
      >
        {children}
      </DialogContent>
      <DialogClose>Close</DialogClose>
    </Dialog>
  )
}
