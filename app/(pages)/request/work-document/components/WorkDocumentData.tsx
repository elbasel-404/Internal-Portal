import { InfoGrid } from "@components"
import { colors } from "@lib"
import type { GeneralInfo } from "@types"

const data: GeneralInfo[] = [
  {
    title: "الطلبات الجديدة",
    count: 4,
    icon: "FileWithPenIcon",
    backgroundColor: colors.light.primaryOpacity,
    id: -230,
    key: "employeeRequests",
    active: true,
    index: 0,
  },
  {
    title: "الطلبات تحت الإجراء",
    count: 15,
    icon: "CalenderSpecialIcon",
    backgroundColor: colors.light.primaryOpacity,
    id: -231,
    key: "employeeRequests",
    active: true,
    index: 1,
  },
  {
    title: "الطلبات المعتمدة",
    count: 9,
    icon: "StampIcon",
    backgroundColor: colors.light.primaryOpacity,
    id: -232,
    key: "employeeRequests",
    active: true,
    index: 2,
  },
  {
    title: "الطلبات المرفوضة",
    count: 4,
    icon: "ClipboardIcon",
    backgroundColor: colors.light.primaryOpacity,
    id: -233,
    key: "employeeRequests",
    active: true,
    index: 3,
  },
  {
    title: "كل الطلبات",
    count: 32,
    icon: "ListAlternativeIcon",
    backgroundColor: colors.light.primaryOpacity,
    id: -234,
    key: "employeeRequests",
    active: true,
    index: 4,
  },
]

export const WorkDocumentData = () => {
  return (
    <div className="py-6">
      <InfoGrid info={data} className="lg:grid-cols-2" />
    </div>
  )
}
