"use client";

import { AnglesLeftIcon } from "@icons"
import { Loader2 } from "lucide-react"
import { useFormStatus } from "react-dom"

export const SubmitButton = () => {
  //   const { pending, data, method, action } = useFormStatus()
  const { pending } = useFormStatus()

  return (
    <div className="pt-0">
      <button
        type="submit"
        disabled={pending}
        className="w-full flex font-medium justify-center rounded-lg items-center gap-2 bg-primary text-white px-4 py-1 border-2 border-primary disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {pending ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            جاري الإرسال...
          </>
        ) : (
          <>
            إرسال الطلب
            <AnglesLeftIcon width={18} height={18} className="fill-white" />
          </>
        )}
      </button>
    </div>
  )
}
