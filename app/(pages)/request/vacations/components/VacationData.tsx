import { InfoGrid } from "@components"
import { GeneralInfo } from "@types"
import { colors } from "@lib"

const data: GeneralInfo[] = [
  {
    title: "الرصيد الحالي",
    count: 1.15,
    icon: "SandClockIcon",
    id: -40,
    backgroundColor: colors.light.primaryOpacity,
    key: "employeeRequests",
    active: true,
    index: 0,
  },
  {
    title: "الرصيد ما قبل اللائحة",
    count: 1.15,
    icon: "PaperIcon",
    buttonName: "تفاصيل",
    id: -41,
    backgroundColor: colors.light.primaryOpacity,
    key: "employeeRequests",
    active: true,
    index: 1,
  },
  {
    title: "الاجازات تحت الإجراء",
    count: 1.15,
    icon: "CalenderSpecialIcon",
    id: -42,
    backgroundColor: colors.light.primaryOpacity,
    key: "employeeRequests",
    active: true,
    index: 2,
  },
  {
    title: "الاجازات المعتمدة",
    count: 1.15,
    icon: "StampIcon",
    id: -43,
    backgroundColor: colors.light.primaryOpacity,
    key: "employeeRequests",
    active: true,
    index: 3,
  },
  {
    title: "المرفوضة /  والملغاة",
    count: 1.15,
    icon: "ClipboardIcon",
    id: -44,
    backgroundColor: colors.light.primaryOpacity,
    key: "employeeRequests",
    active: true,
    index: 4,
  },
  {
    title: "كل الاجازات",
    count: 1.15,
    icon: "ListAlternativeIcon",
    id: -45,
    backgroundColor: colors.light.primaryOpacity,
    key: "employeeRequests",
    active: true,
    index: 5,
  },
]

export const VacationData = () => {
  return <InfoGrid info={data} />
}
