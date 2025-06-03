import { InfoGrid } from "@components"
import { colors } from "@lib"
import type { GeneralInfo } from "@types"

const data: GeneralInfo[] = [
  {
    title: "الرصيد الحالي",
    count: 1.15,
    icon: "TimeBlueIcon",
    backgroundColor: colors.light.primaryOpacity,
    id: -230,
    key: "employeeRequests",
    active: true,
    index: 0,
  },
  {
    title: "الانتدابات تحت الإجراء",
    count: 1.15,
    icon: "CalenderSpecialIcon",
    backgroundColor: colors.light.primaryOpacity,
    id: -231,
    key: "employeeRequests",
    active: true,
    index: 1,
  },
  {
    title: "الانتدابات المعتمدة",
    count: 1.15,
    icon: "StampIcon",
    backgroundColor: colors.light.primaryOpacity,
    id: -232,
    key: "employeeRequests",
    active: true,
    index: 2,
  },
  {
    title: "المرفوضة/الملغاة",
    count: 1.5,
    icon: "ClipboardIcon",
    backgroundColor: colors.light.primaryOpacity,
    id: -233,
    key: "employeeRequests",
    active: true,
    index: 3,
  },
  {
    title: "كل الانتدابات",
    count: 1.15,
    icon: "ListAlternativeIcon",
    backgroundColor: colors.light.primaryOpacity,
    id: -234,
    key: "employeeRequests",
    active: true,
    index: 4,
  },
]

export const DeputationData = () => {
  return (
    <div className="py-6">
      <InfoGrid info={data} className="lg:grid-cols-2" />
    </div>
  )
}
