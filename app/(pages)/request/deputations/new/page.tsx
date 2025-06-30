import { CreateRequestStatus } from "@components"
import { getUser } from "@db/actions"
import {
  getCreateRequestStatus,
  getDeputationTypes,
  getSubstituteEmployees,
  getUserId,
} from "@server"
import { DeputationForm } from "../components"

const NewDeputationPage = async () => {
  // const requestStatus = await getRequestStatus("", "")
  const userId = await getUserId()
  if (!userId) return

  const { deputationLocation } = await getUser(userId)
  const deputationTypes = await getDeputationTypes()
  const substituteEmployees = await getSubstituteEmployees()
  const requestStatus = await getCreateRequestStatus("hr.deputation")
  const requestCaption =
    "انت الان في مرحلة انشاء الطلب و بانتظار موافقة المدير المباشر"
  return (
    <div className="space-y-4 mb-16">
      <CreateRequestStatus status={requestStatus} caption={requestCaption} />
      <DeputationForm
        substituteEmployees={substituteEmployees}
        deputationType={deputationTypes}
        deputationLocation={deputationLocation.filter(
          (loc): loc is { country_id: string; city_name: string } =>
            typeof loc.country_id === "string" && typeof loc.city_name === "string"
        )}
      />
    </div>
  )
}

export default NewDeputationPage
