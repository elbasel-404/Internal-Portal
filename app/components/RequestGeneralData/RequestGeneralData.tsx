import { InfoGrid } from "@components"
// import { colors } from "@lib"
// import type { GeneralInfo } from "@types"

import { getGeneralInfo } from "./getGenealInfo"
import type { RequestGeneralInfoModel } from "./types/RequestGeneralInfoModel"
import { getUser } from "@db/actions"
import { getUserId } from "@server"
import { GeneralInfoKeysObject } from "./types/GeneralInfoKeysObject"

interface RequestGeneralDataProps {
  model: RequestGeneralInfoModel
}

export const RequestGeneralData = async ({
  model,
}: RequestGeneralDataProps) => {
  const data = await getGeneralInfo({ model })
  const userId = await getUserId()
  if (!userId) {
    throw new Error("User not found")
  }
  const user = await getUser(userId)
  const { activeGeneralInfoKeys } = user

  const dataObject: GeneralInfoKeysObject = {}

  for (const key of activeGeneralInfoKeys) {
    dataObject[key as keyof GeneralInfoKeysObject] =
      data[key as keyof GeneralInfoKeysObject] || 0
  }

  return (
    <div className="py-6">
      {/* <InfoGrid info={dummyData} className="lg:grid-cols-2" /> */}
      <InfoGrid info={dataObject} className="lg:grid-cols-2" />
    </div>
  )
}

// const dummyData: GeneralInfo[] = [
//   {
//     title: "الطلبات تحت الإجراء",
//     count: 1.15,
//     icon: "SandClockIcon",
//     backgroundColor: colors.light.primaryOpacity,
//     id: -180,
//     key: "employeeRequests",
//     active: true,
//     index: 0,
//   },
//   {
//     title: "الطلبات المعتمدة",
//     count: 1.15,
//     icon: "StampIcon",
//     backgroundColor: colors.light.primaryOpacity,
//     id: -181,
//     key: "employeeRequests",
//     active: true,
//     index: 1,
//   },
//   {
//     title: "الطلبات المرفوضة",
//     count: 1.15,
//     icon: "ClipboardIcon",
//     backgroundColor: colors.light.primaryOpacity,
//     id: -182,
//     key: "employeeRequests",
//     active: true,
//     index: 2,
//   },
//   {
//     title: "كل الطلبات",
//     count: 1.15,
//     icon: "ListAlternativeIcon",
//     backgroundColor: colors.light.primaryOpacity,
//     id: -183,
//     key: "employeeRequests",
//     active: true,
//     index: 3,
//   },
// ]
