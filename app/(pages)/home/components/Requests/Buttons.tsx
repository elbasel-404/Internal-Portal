"use client"
import { CheckIcon, XMarkIcon } from "@icons"
import { acceptRequest } from "./acceptRequest"
import { rejectRequest } from "./rejectRequest"

export interface ButtonsProps {
  requestId: string
}
export const Buttons = ({ requestId }: ButtonsProps) => {
  return (
    <div className="flex gap-2 flex-1 items-center justify-center">
      <form className="flex-1 flex gap-2">
        <input type="hidden" name="requestId" value={requestId} />
        <button
          type="submit"
          formAction={acceptRequest}
          className="flex group gap-1 items-center shadow-none hover:bg-green-600 font-medium hover:text-white justify-end text-success-foreground bg-success rounded-xl px-6 py-2"
        >
          <CheckIcon className="fill-success-foreground group-hover:fill-white" />
          اعتمد
        </button>
        <button
          type="submit"
          formAction={rejectRequest}
          className="flex group gap-1 items-center shadow-none hover:bg-red-600 font-medium hover:text-white justify-end text-destructive-foreground bg-destructive-opacity rounded-xl px-6 py-2"
        >
          <XMarkIcon className="fill-destructive-foreground group-hover:fill-white" />
          مرفوض
        </button>
      </form>
    </div>
  )
}
