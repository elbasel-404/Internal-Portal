"use server"

import type { EvaluationFlow } from "@types"

export const getEvaluationFlowList = async (): Promise<EvaluationFlow[]> => {
  return EvaluationFlowDummyData
}

const EvaluationFlowDummyData: EvaluationFlow[] = [
  {
    id: "#10011",
    requestDate: "2021 - 01 - 01",
    carrerLevel: "أخصائي أول",
    employee: "أحمد محمد",
    flowType: "المتابعة الرسمية",
    status: "اعتمد",
  },
  {
    id: "#10012",
    requestDate: "2022 - 01 - 01",
    carrerLevel: "أخصائي تاني",
    employee: "سارة علي",
    flowType: "المتابعة الرسمية",
    status: "قسم الأداء و المكافآت",
  },
  {
    id: "#10013",
    requestDate: "2023 - 01 - 01",
    carrerLevel: "أخصائي أول",
    employee: "محمد حسن",
    flowType: "المتابعة الشخصية",
    status: "قسم الأداء و المكافآت",
  },
  {
    id: "#10014",
    requestDate: "2024 - 01 - 01",
    carrerLevel: "أخصائي تاني",
    employee: "ليلى يوسف",
    flowType: "المتابعة الدورية",
    status: "اعتمد",
  },
  {
    id: "#10015",
    requestDate: "2025 - 01 - 01",
    carrerLevel: "أخصائي أول",
    employee: "علي أحمد",
    flowType: "المتابعة الرسمية",
    status: "اعتمد",
  },
  {
    id: "#10016",
    requestDate: "2026 - 01 - 01",
    carrerLevel: "أخصائي تاني",
    employee: "منى خالد",
    flowType: "المتابعة الشخصية",
    status: "قسم الأداء و المكافآت",
  },
  {
    id: "#10018",
    requestDate: "2028 - 01 - 01",
    carrerLevel: "أخصائي أول",
    employee: "يوسف سعيد",
    flowType: "المتابعة الدورية",
    status: "اعتمد",
  },
]
