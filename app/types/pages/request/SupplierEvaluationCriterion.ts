import { SupplierKPI } from "@types"

export type SupplierEvaluationCriterion = {
  id: string
  name: string
  weight: string
  evaluationPoints: string
  totalPoints: string
  kpis: SupplierKPI[]
}
