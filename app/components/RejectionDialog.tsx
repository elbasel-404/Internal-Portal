// ! Or remove "use client" from this line to make onSubmit and OnClose work
"use client"

import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Textarea,
} from "@ui"
import { ChangeEvent, useState } from "react"
import { CheckIcon, MoneyCheckPenIcon, XMarkIcon } from "../icons"

interface RejectReasonDialogProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (reason: string) => void
  requestTitle?: string
  requestId: string
  requestDate?: string
}

// ! TODO: Rename this to match file name
// Props must be serializable for components in the "use client" entry file.
// "onClose" is a function that's not a Server Action.
// Rename "onClose" either to "action" or have its name end with "Action"
// e.g. "onCloseAction" to indicate it is a Server Action.ts(71007)
// ! onSubmit TOO
export const RejectReasonDialog = ({
  isOpen,
  onClose,
  onSubmit,
  requestTitle,
  requestId,
  requestDate,
}: RejectReasonDialogProps) => {
  const [reason, setReason] = useState<string>("")

  const handleReasonChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setReason(e.target.value)
  }

  const handleSubmit = () => {
    if (reason.trim()) {
      onSubmit(reason)
      onClose()
    } else {
      alert("يرجى ذكر سبب الرفض")
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader className="">
          <DialogTitle className="text-right text-lg font-bold bg-primary-opacity p-3 border-r-[3px] border-primary -mx-[25px] -mt-[25px]">
            سبب الرفض
          </DialogTitle>
        </DialogHeader>
        <DialogDescription asChild>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="bg-cloudGray rounded-full p-2 text-foreground">
                رقم الطلب: {requestId}
              </div>
              <div className="bg-cloudGray rounded-full p-2 text-foreground">
                تاريخ الطلب: {requestDate}
              </div>
            </div>
            {/* Request Title */}
            <div className="flex items-center gap-2 bg-primary-opacity text-primary py-2 px-4 rounded-full text-right font-medium">
              <MoneyCheckPenIcon />
              <div>{requestTitle}</div>
            </div>
            {/* Input for rejection reason */}
            <Textarea
              className="text-right resize-none border-b-2 border-b-gray-300 bg-cloudGray placeholder:text-black placeholder:text-xs shadow-none"
              rows={2}
              placeholder="الرجاء ذكر سبب الرفض"
              value={reason}
              onChange={handleReasonChange}
            />
          </div>
        </DialogDescription>
        <DialogFooter className="flex justify-between gap-2">
          <DialogClose asChild>
            <Button className="flex items-center gap-1 bg-[#DEE5ED] text-stormGray shadow-none hover:bg-gray-300 rounded-xl p-4">
              <XMarkIcon className="fill-stormGray w-0 h-0" />
              إغلاق
            </Button>
          </DialogClose>
          <Button
            className="flex items-center gap-1 bg-primary-opacity group text-primary shadow-none hover:bg-primary hover:text-white rounded-xl p-4"
            onClick={handleSubmit}
          >
            <CheckIcon className="fill-primary group-hover:fill-white" />
            تأكيد
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
