"use client"

import type { ApprovalRequest } from "@types"
import { CheckIcon } from "lucide-react"
import { useState } from "react"
import { twMerge } from "tailwind-merge"
import { acceptRequest } from "./acceptRequest"
import { rejectRequest } from "./rejectRequest"

interface ApprovalRequestsProps {
  requests: ApprovalRequest[]
}

export const ApprovalRequests = ({ requests }: ApprovalRequestsProps) => {
  const handleAllCheck = () => {
    const labels = document.querySelectorAll(
      ".approval-request-label",
    ) as NodeListOf<HTMLLabelElement>
    labels.forEach((label) => {
      label.click()
    })
    const event = new Event("click", { bubbles: false })
    labels.forEach((label) => {
      label.dispatchEvent(event)
    })
  }
  return (
    <div>
      <div className="flex flex-col">
        <div className="flex items-center p-2 bg-slate-200">
          <div onClick={handleAllCheck}>
            <CheckBox name="selectAll" id="select-all" />
          </div>
          <h2 className="flex-1 text-center">رقم الطلب</h2>
          <h2 className="flex-1 text-center">المسمى</h2>
          <h2 className="flex-1 text-center">تاريخ الطلب</h2>
          <h2 className="flex-1 text-center">الحالة</h2>
        </div>
        {requests.map((request, index) => (
          <div
            key={request.id}
            className={twMerge(
              "flex items-center p-2",
              index % 2 !== 0 && "bg-slate-200",
            )}
          >
            <CheckBox
              name={`select-${request.id}`}
              id={`select-${request.id}`}
            />
            <p className="flex-1 text-center">{request.id}</p>
            <p className="flex-1 text-center">{request.description}</p>
            <p className="flex-1 text-center">{request.date}</p>
            <Buttons requestId={request.id} />
          </div>
        ))}
      </div>
    </div>
  )
}

interface ButtonsProps {
  requestId: string
}

const Buttons = ({ requestId }: ButtonsProps) => {
  return (
    <div className="flex gap-2 flex-1 items-center justify-center">
      <form>
        <input type="hidden" name="requestId" value={requestId} />
        <button
          type="submit"
          formAction={acceptRequest}
          className="bg-green-100 text-green-900 flex-1 rounded-xl"
        >
          قبول
        </button>
        <button
          type="submit"
          formAction={rejectRequest}
          className="bg-red-100 text-red-900 flex-1 rounded-xl"
        >
          رفض
        </button>
      </form>
    </div>
  )
}

interface CheckBoxProps {
  name: string
  id: string
}

const CheckBox = ({ name, id }: CheckBoxProps) => {
  const [isChecked, setIsChecked] = useState(false)

  const handleCheck = () => {
    setIsChecked((prev) => !prev)
  }

  return (
    <div
      className={twMerge(
        "items-center justify-center w-5 h-5 border border-primary rounded flex cursor-pointer hover:border-gray-400 transition-colors",
        isChecked && "bg-primary border-primary",
      )}
    >
      <input
        name={name}
        id={id}
        type="checkbox"
        className="sr-only hidden approval-checkbox"
        // checked={isChecked}
        // onChange={handleCheck}
      />
      <label
        htmlFor={id}
        className="flex-1 h-full flex approval-request-label"
        onClick={handleCheck}
      >
        <span className="sr-only">{name} checkbox</span>
        <div className="pointer-events-none flex flex-1 items-center justify-center">
          {isChecked && <CheckIcon className="w-3 h-3 text-white" />}
        </div>
      </label>
    </div>
  )
}
