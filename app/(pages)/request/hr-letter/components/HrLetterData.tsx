import type { GeneralInfo } from "@types"
import { InfoGrid } from "@components"
import { colors } from "@lib"

// TODO: Move this to server action getHRLetterGeneralInfo();
const data: GeneralInfo[] = [
  {
    title: "الخطابات تحت الإجراء",
    count: 1.15,
    icon: "SandClockIcon",
    backgroundColor: colors.light.primaryOpacity,
    id: -10,
    key: "employeeRequests",
    active: true,
    index: 0,
  },
  {
    title: "الخطابات المعتمدة",
    count: 1.15,
    icon: "StampIcon",
    backgroundColor: colors.light.primaryOpacity,
    id: -11,
    key: "employeeRequests",
    active: true,
    index: 1,
  },
  {
    title: "الخطابات المرفوضة",
    count: 1.15,
    icon: "ClipboardIcon",
    backgroundColor: colors.light.primaryOpacity,
    id: -12,
    key: "employeeRequests",
    active: true,
    index: 2,
  },
  {
    title: "كل الخطابات",
    count: 1.15,
    icon: "ListAlternativeIcon",
    backgroundColor: colors.light.primaryOpacity,
    id: -13,
    key: "employeeRequests",
    active: true,
    index: 3,
  },
]

export const HrLetterData = () => {
  return (
    <div className="py-6">
      <InfoGrid info={data} className="lg:grid-cols-2" />
    </div>
  )
}
