"use client"

import { toggleHomePageSetting } from "@server"
import type { GeneralInfoKey, HomePageSlotKey, NewsTabsKey } from "@types"
import { Switch } from "@ui"
import { cn } from "@utils"
import { useRouter } from "next/navigation"
import { useActionState, useEffect, useState } from "react"
import { toast } from "sonner"

interface ToggleFormProps {
  userId: number
  slotKey: HomePageSlotKey | GeneralInfoKey | NewsTabsKey
  active: boolean
  slotTitle?: string
  className?: string
  slotType: "generalInfo" | "homePage" | "news"
  // shouldSubmit?: boolean;
  // invalidSubmitMessage?: string;
  // refreshOnChange?: boolean;
  // renderToggle?: boolean;
}

export type InitialState = {
  // active: boolean;
  key: string
  type: string
  userId: number
  error: string
}
const initialState: InitialState = {
  // active: false,
  key: "",
  type: "",
  userId: 0,
  error: "",
}

export const ToggleForm = ({
  userId,
  slotKey,
  active,
  slotTitle,
  className,
  slotType,
}: // shouldSubmit = true,
// invalidSubmitMessage,
// slotType,
// refreshOnChange = false,
// renderToggle = true,
ToggleFormProps) => {
  const [state, formAction, pending] = useActionState(
    toggleHomePageSetting,
    initialState,
  )
  const router = useRouter()
  const [checked, setChecked] = useState(active)

  useEffect(() => {
    if (!router) return
    const errorMessage = state.error
    if (errorMessage) {
      toast.error(errorMessage)
      setTimeout(() => {
        setChecked(false)
      }, 500)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pending])

  const renderToggleForm = () => {
    return (
      <form action={formAction} className={cn("flex items-center", className)}>
        <input type="text" name="userId" value={userId} hidden readOnly />
        <input type="text" name="slotKey" value={slotKey} hidden readOnly />
        <input type="text" name="slotType" value={slotType} hidden readOnly />
        <Switch
          checked={checked}
          type="submit"
          onCheckedChange={() => {
            setChecked((prev) => !prev)
          }}
        />
      </form>
    )
  }

  return (
    <div
      className={cn(
        "flex transition-colors items-center justify-between py-[10.5px] border-b border-primary-opacity gap-x-2",
        // slotType === 'homePage' ? 'font-medium px-3' : 'font-normal px-6'
      )}
    >
      <div className="my-auto ml-10 min-w-max lg:ml-0">{slotTitle}</div>
      {renderToggleForm()}
    </div>
  )
}
