import { InfoGrid } from "@components"
import { colors } from "@lib"
import type { GeneralInfo } from "@types"

const data: GeneralInfo[] = [
  {
    title: "التعريفات تحت الإجراء",
    count: 1.15,
    icon: "SandClockIcon",
    backgroundColor: colors.light.primaryOpacity,
    id: -150,
    key: "employeeRequests",
    active: true,
    index: 0,
  },
  {
    title: "التعريفات المعتمدة",
    count: 1.15,
    icon: "StampIcon",
    backgroundColor: colors.light.primaryOpacity,
    id: -151,
    key: "employeeRequests",
    active: true,
    index: 1,
  },
  {
    title: "التعريفات المرفوضة / الملغاة",
    count: 1.15,
    icon: "ClipboardIcon",
    backgroundColor: colors.light.primaryOpacity,
    id: -152,
    key: "employeeRequests",
    active: true,
    index: 2,
  },
  {
    title: "كل التعريفات",
    count: 1.15,
    icon: "ListAlternativeIcon",
    backgroundColor: colors.light.primaryOpacity,
    id: -153,
    key: "employeeRequests",
    active: true,
    index: 3,
  },
]

export const ReplacementCovenantData = () => {
  return (
    <div className="py-6">
      <InfoGrid info={data} className="lg:grid-cols-2" />
    </div>
  )
}
