"use client"
import { ActionState } from "@api/types/ActionState"
import { useActionState, useEffect, useState, type ReactNode } from "react"
import { toast } from "sonner"
import { Output } from "./Output"

interface FormProps {
  children: ReactNode
  action: (state: ActionState, formData: FormData) => Promise<ActionState>
  onStateChange?: (state: ActionState) => void
  onIsPendingChange?: (isPending: boolean) => void
}
export const Form = ({
  children,
  action,
  onIsPendingChange,
  onStateChange,
}: FormProps) => {
  const [state, formAction, isPending] = useActionState(action, {
    error: null,
    data: null,
  })

  const [json, setJson] = useState()

  useEffect(() => {
    if (onStateChange) {
      onStateChange(state)
    }
  }, [state, onStateChange])

  useEffect(() => {
    if (onIsPendingChange) {
      onIsPendingChange(isPending)
    }
  }, [isPending, onIsPendingChange])

  useEffect(() => {
    if (isPending) toast.loading("Fetching data...", { id: "fetching-data" })
    else toast.dismiss("fetching-data")
  }, [isPending])

  useEffect(() => {
    if (state.data) setJson(state.data)
  }, [state])

  return (
    <>
      <form action={formAction} className="space-y-4">
        {children}
      </form>
      <button
        disabled={isPending}
        className="w-full px-4 py-2 bg-blue-900 rounded-lg disabled:bg-gray-500"
        type="submit"
      >
        Submit
      </button>
      <div className="pt-8">
        <Output json={json} />
      </div>
    </>
  )
}
