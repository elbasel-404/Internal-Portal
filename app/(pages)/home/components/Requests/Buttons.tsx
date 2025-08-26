"use client"
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
          className="bg-green-100 basis-full w-full text-green-900 flex-1 rounded-xl"
        >
          قبول
        </button>
        <button
          type="submit"
          formAction={rejectRequest}
          className="bg-red-100 hover:bg-red-400 hover:ring-2 ring-red-400 hover:text-white transition-colors basis-full w-full text-red-900 flex-1 rounded-xl"
        >
          رفض
        </button>
      </form>
    </div>
  )
}
