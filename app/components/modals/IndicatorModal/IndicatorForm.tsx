"use client"

import { InputField } from "@components/form"
import { useRouter } from "next/navigation"
import { ChangeEvent, useState } from "react"
import { FormActions } from "./components/FormActions"

export const IndicatorForm = () => {
  const router = useRouter()
  const [indicatorName, setIndicatorName] = useState<string>("")

  const handleIndicatorNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIndicatorName(e.target.value)
  }

  const closeModal = () => {
    router.back()
  }

  const handleSubmit = () => {
    closeModal()
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4">
      <InputField
        label="اسم مؤشر الأداء"
        name="indicatorName"
        value={indicatorName}
        onChange={handleIndicatorNameChange}
        required
      />
      <FormActions onClose={closeModal} onSubmit={handleSubmit} />
    </form>
  )
}
