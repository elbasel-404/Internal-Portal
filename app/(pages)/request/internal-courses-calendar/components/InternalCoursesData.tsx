import { InfoGrid } from "@components"
import { colors } from "@lib"
import type { GeneralInfo } from "@types"

const data: GeneralInfo[] = [
  {
    title: "الدورات الداخلية",
    count: 1.15,
    icon: "ListAlternativeIcon",
    backgroundColor: colors.light.primaryOpacity,
    id: -170,
    key: "employeeRequests",
    active: true,
    index: 3,
  },
]

export const InternalCoursesData = () => {
  return (
    <div>
      <InfoGrid info={data} className="lg:grid-cols-2" />
    </div>
  )
}
