"use server"

import { SupplierEvaluationCriterion } from "@types"

export const getSupplierEvaluationRequestCriteria = async (
  id: string,
): Promise<SupplierEvaluationCriterion[] | void> => {
  return SupplierEvaluationData
}
const SupplierEvaluationData: SupplierEvaluationCriterion[] = [
  {
    id: "1",
    name: "ادارة عقد",
    weight: "10",
    evaluationPoints: "",
    totalPoints: "",
    kpis: [
      {
        id: "10001",
        name: "الالتزام بشروط العقد",
        measurement: "نسبة الالتازام باغلاق الملاحظات المتعلقة بشروط العقد",
        pointsValue: "10",
        evaluationPoints: ["95 %", "95 % - 85 %", "85 %"],
        notes: "لا يوجد",
      },
    ],
  },
  {
    id: "2",
    name: "الجودة",
    weight: "20",
    evaluationPoints: "",
    totalPoints: "",
    kpis: [
      {
        id: "2001",
        name: "اتباع تنفيذ طريقة الخدمات",
        measurement:
          "نسبة الالتازام باغلاق الملاحظات المتعلقة بالخدمات المنفذه",
        pointsValue: "30",
        evaluationPoints: ["95 %", "95 % - 85 %", "85 %"],
        notes: "لا يوجد",
      },
      {
        id: "2002",
        name: "الالتزام بشروط والمواصفات الفنيه",
        measurement:
          "نسبة الالتازام باغلاق الملاحظات المتعلقة بالاشتراطات والموصفات الفنية المطلوبة",
        pointsValue: "10",
        evaluationPoints: ["89 %", "89 % - 70 %", "70 %"],
        notes: "لا يوجد",
      },
      {
        id: "2003",
        name: "جودة التقارير وصحتها",
        measurement: "تقديم تقارير كاملة وصحيه",
        pointsValue: "100",
        evaluationPoints: [
          "كاملة وصحيحة",
          "وجود بعض الاخطاء (غير مؤثرة)",
          "وجود اخطاء جوهرية",
        ],
        notes: "لا يوجد",
      },
    ],
  },
  {
    id: "3",
    name: "التسليم",
    weight: "30",
    evaluationPoints: "",
    totalPoints: "",
    kpis: [
      {
        id: "30001",
        name: "الالتزام بالجدول الزمني",
        measurement: "نسبة االاختلاف عن الجدول الزمني المخطط",
        pointsValue: "20",
        evaluationPoints: ["5 %", "10 % - 5 %", "10 %"],
        notes: "لا يوجد",
      },
      {
        id: "30002",
        name: "التسلم خالبي من العيوب",
        measurement:
          "نسبة الالتازام باغلاق الملاحظات المتعلقة بالتسليم النهائي",
        pointsValue: "30",
        evaluationPoints: ["89 %", "89 % - 70 %", "70 %"],
        notes: "لا يوجد",
      },
      {
        id: "30003",
        name: "صحة معلومات وثائق التسليم",
        measurement:
          "صحة معلومات ووثائق التسليم(مذكرات التسليم وقوائم التعبئة والفواتير)",
        pointsValue: "10",
        evaluationPoints: [
          "كاملة وصحيحة",
          "وجود بعض الاخطاء (غير مؤثرة)",
          "وجود اخطاء جوهرية",
        ],
        notes: "لا يوجد",
      },
    ],
  },
  {
    id: "4",
    name: "الالتزام بالمحتوى المحلي",
    weight: "15",
    evaluationPoints: "",
    totalPoints: "",
    kpis: [
      {
        id: "40001",
        name: "الالتزام بنسبة المحتوي المحلي المستهدفة",
        measurement:
          "الفرق بين بنسبة المحتوي المحلي المستهدفة والمستوي المحلي المحققة",
        pointsValue: "50",
        evaluationPoints: [
          "5 % واقل",
          "اكثر من 5 % وبما لا يتجاوز 15 %",
          "اكثر من 15 %",
        ],
        notes: "لا يوجد",
      },
    ],
  },
  {
    id: "5",
    name: "سرعة وسهولة تجاوب المتعاقد",
    weight: "15",
    evaluationPoints: "",
    totalPoints: "",
    kpis: [
      {
        id: "50001",
        name: "التواصل",
        measurement: "عدم ايام التأخير في الرد علي الاستفسارات وطلبات البيانات",
        pointsValue: "10",
        evaluationPoints: ["< 5 ايام", "5 - 10 ايام", "< 10 ايام"],
        notes: "لا يوجد",
      },
      {
        id: "50002",
        name: "المرونة",
        measurement: "نسبة الالتزام بأغلاق الملاحظات المتعلقة بطلبات التغير",
        pointsValue: "30",
        evaluationPoints: ["89 % <", "89 % - 70 %", "70 %"],
        notes: "لا يوجد",
      },
      {
        id: "50003",
        name: "الاستجابة للطوارئ",
        measurement: "عدد ساعات التأخير في الاستجابة للطورائ",
        pointsValue: "100",
        evaluationPoints: ["< 6 ساعات", "6 - 12 ساعة", "< 12 ساعات"],
        notes: "لا يوجد",
      },
      {
        id: "50004",
        name: "التعامل مع اصحاب العلاقة",
        measurement:
          "نسبة الاستجابة لطلبات التعاون مع اصحاب العلاقة او مقاولين اخرين",
        pointsValue: "30",
        evaluationPoints: ["89 % <", "89 % - 70 %", "70 %"],
        notes: "لا يوجد",
      },
    ],
  },
  {
    id: "6",
    name: "البيئة والصحة والسلامة",
    weight: "10",
    evaluationPoints: "",
    totalPoints: "",
    kpis: [
      {
        id: "60001",
        name: "سلامة بيئة العمل",
        measurement: "حالة بيئة العمل وخلوها من المخاطر علي العاملين",
        pointsValue: "30",
        evaluationPoints: ["خالية من المخاطر", "تحتاج تحسين", "غير مقبولة"],
        notes: "لا يوجد",
      },
      {
        id: "60002",
        name: "عدم وجود مخالفات للسلامة",
        measurement: "عدد المخالفات",
        pointsValue: "30",
        evaluationPoints: ["< من 10", "20-10", "> من 20"],
        notes: "لا يوجد",
      },
    ],
  },
]
