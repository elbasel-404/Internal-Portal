"use client"

import { CheckIcon } from "lucide-react"
import { useState } from "react"
import { twMerge } from "tailwind-merge"

interface CheckBoxProps {
  name: string
  id: string
}

export const CheckBox = ({ name, id }: CheckBoxProps) => {
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
      />
      <label
        id={`label-${id}`}
        data-is-checked={isChecked}
        htmlFor={id}
        className={`flex-1 h-full flex approval-request-label label-${id}`}
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
