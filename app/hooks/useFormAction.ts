"use client"

import { useState, useEffect } from "react"
import { toast } from "sonner"
import { State } from "../lib/createData"

/**
 * A custom hook for handling form submission state and actions
 * @param actionFn The server action function that processes the form
 * @returns Form state, action handler, and pending status
 */
export function useFormAction(
  actionFn: (formData: FormData) => Promise<State>,
  toastId = "form-loading-toast",
) {
  const [state, setState] = useState<State>({
    success: false,
    errors: null,
    id: null,
  })

  const [pending, setPending] = useState(false)

  useEffect(() => {
    const { success, errors } = state
    if (success) {
      toast.success("تم انشاء الطلب بنجاح")
    }
    if (errors && errors.length > 0) {
      errors.forEach((message) => toast.error(message))
    }
  }, [state])

  useEffect(() => {
    if (pending) {
      toast.loading("جاري انشاء الطلب", { id: toastId })
    } else {
      toast.dismiss(toastId)
    }
  }, [pending, toastId])

  const action = async (formData: FormData) => {
    setPending(true)
    try {
      const result = await actionFn(formData)
      setState(result)
    } catch (error) {
      console.error("Form submission error:", error)
      setState({
        success: false,
        errors: ["حدث خطأ أثناء معالجة النموذج"],
        id: null,
      })
    } finally {
      setPending(false)
    }
  }

  return {
    state,
    action,
    pending,
    setState,
  }
}
