import { InfoGrid } from "@components"
import { colors } from "@lib"
import type { GeneralInfo } from "@types"

const data: GeneralInfo[] = [
  {
    title: "الطلبات تحت الإجراء",
    count: 15,
    icon: "CalenderSpecialIcon",
    backgroundColor: colors.light.primaryOpacity,
    id: -210,
    key: "employeeRequests",
    active: true,
    index: 0,
  },
  {
    title: "الطلبات المعتمدة",
    count: 15,
    icon: "StampIcon",
    backgroundColor: colors.light.primaryOpacity,
    id: -211,
    key: "employeeRequests",
    active: true,
    index: 1,
  },
  {
    title: "الطلبات المرفوضة",
    count: 10,
    icon: "ClipboardIcon",
    backgroundColor: colors.light.primaryOpacity,
    id: -212,
    key: "employeeRequests",
    active: true,
    index: 2,
  },
  {
    title: "كل الطلبات",
    count: 40,
    icon: "ListAlternativeIcon",
    backgroundColor: colors.light.primaryOpacity,
    id: -213,
    key: "employeeRequests",
    active: true,
    index: 3,
  },
]

export const PurchaseData = () => {
  return (
    <div className="py-6">
      <InfoGrid info={data} className="lg:grid-cols-2" />
    </div>
  )
}
