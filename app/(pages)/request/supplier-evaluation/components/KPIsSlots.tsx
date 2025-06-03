"use client"

import { KPIsTable } from "./KPIsTable"
import { SupplierEvaluationCriterion } from "@types"
import type { ReactNode } from "react"
import { filterSlots } from "./helpers/filterSlots"

interface SupplierEvaluationCriterionProps {
  data: SupplierEvaluationCriterion[]
}

export const KPIsSlots = ({ data }: SupplierEvaluationCriterionProps) => {
  const slots = (): { key: string; title: string; node: React.ReactNode }[] =>
    data.map((criterion, index) => {
      const node: ReactNode = <KPIsTable data={criterion.kpis} />
      return {
        key: `${index}-${criterion.id}`,
        title: criterion.name,
        node,
      }
    }) || []

  const activeSlotKeys =
    data.map((criterion, index) => `${index}-${criterion.id}`) || []
  const slotsToRender = filterSlots(slots(), activeSlotKeys)

  return <>{slotsToRender}</>
}
