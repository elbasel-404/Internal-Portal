"use client"

import type { ReactNode } from "react"
import { KPIsTable } from "./KPIsTable"
import { KPIsCollapse } from "./KPIsCollapse"
import { SupplierEvaluationCriterion } from "@types"
import { filterSlots } from "./helpers/filterSlots"

interface SupplierEvaluationCriterionProps {
  data: SupplierEvaluationCriterion[]
  isForm?: boolean
}

export const EvaluationCriteriaItems = ({
  data,
  isForm,
}: SupplierEvaluationCriterionProps) => {
  const slots = (): { key: string; title: string; node: React.ReactNode }[] =>
    data.map((criterion, index) => {
      const node: ReactNode = (
        <KPIsTable data={criterion.kpis} isForm={isForm} />
      )
      return {
        key: `${index}-${criterion.id}`,
        title: criterion.name,
        node,
      }
    }) || []

  const activeSlotKeys =
    data.map((criterion, index) => `${index}-${criterion.id}`) || []
  const slotsToRender = filterSlots(slots(), activeSlotKeys)
  const visuallyHiddenKeys: string[] = []

  return (
    <>
      {
        <KPIsCollapse
          visuallyHiddenKeys={visuallyHiddenKeys}
          slots={slotsToRender}
        />
      }
    </>
  )
}
