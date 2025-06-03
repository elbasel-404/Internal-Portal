"use client"

import { InputField } from "@components/form"
import { useRouter } from "next/navigation"
import { ChangeEvent, useState } from "react"
import { FormActions } from "./components/FormActions"

export const IndividualGoalForm = () => {
  const router = useRouter()
  const [individualGoalName, setIndividualGoalName] = useState<string>("")

  const handleIndividualGoalNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIndividualGoalName(e.target.value)
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
        label="اسم الهدف الفردي"
        name="individualGoalName"
        value={individualGoalName}
        onChange={handleIndividualGoalNameChange}
        required
      />
      <FormActions onClose={closeModal} onSubmit={handleSubmit} />
    </form>
  )
}
