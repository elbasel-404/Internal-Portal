"use client"

import { Indicator } from "@types"
import { useRouter } from "next/navigation"
import { useState } from "react"
import {
  FormActions,
  GoalDetailsSection,
  GoalsFormHeader,
  IndividualGoalSection,
  OrganizationalGoalsSection,
} from "./components"
import PerformanceIndicatorsTable from "./components/PerformanceIndicatorTable"

interface FormData {
  organizationalGoalLevel1: string
  strategicGoalLevel2: string
  strategicGoalLevel3: string
  individualGoal: string
  measurementPeriod: string
  goalWeight: string
  startDate: Date
  endDate: Date
}

interface GoalFormProps {
  indicatorData: Indicator[]
}

export const GoalsForm = ({ indicatorData }: GoalFormProps) => {
  const router = useRouter()

  const [formData, setFormData] = useState<FormData>({
    organizationalGoalLevel1: "",
    strategicGoalLevel2: "",
    strategicGoalLevel3: "",
    individualGoal: "",
    measurementPeriod: "",
    goalWeight: "",
    startDate: new Date(),
    endDate: new Date(),
  })

  const closeModal = () => {
    router.back()
  }

  const handleInputChange = (
    name: string,
    value: string | Date | null | undefined,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = () => {
    closeModal()
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <GoalsFormHeader title="إنشاء هدف جديد" />

      <div className="px-4 space-y-4">
        <OrganizationalGoalsSection
          formData={{
            organizationalGoalLevel1: formData.organizationalGoalLevel1,
            strategicGoalLevel2: formData.strategicGoalLevel2,
            strategicGoalLevel3: formData.strategicGoalLevel3,
          }}
          onInputChange={handleInputChange}
        />

        <IndividualGoalSection
          individualGoal={formData.individualGoal}
          onInputChange={handleInputChange}
        />

        <GoalDetailsSection
          formData={{
            measurementPeriod: formData.measurementPeriod,
            goalWeight: formData.goalWeight,
            startDate: formData.startDate,
            endDate: formData.endDate,
          }}
          onInputChange={handleInputChange}
        />
      </div>

      <PerformanceIndicatorsTable indicatorData={indicatorData} />

      <FormActions onClose={closeModal} onSubmit={handleSubmit} />
    </form>
  )
}
