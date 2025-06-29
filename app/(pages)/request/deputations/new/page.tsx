import { CreateRequestStatus } from "@components"
import {
  getCreateRequestStatus,
  getDeputationTypes,
  getSubstituteEmployees,
} from "@server"
import { DeputationForm } from "../components"

const NewDeputationPage = async () => {
  // const requestStatus = await getRequestStatus("", "")
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
      />
    </div>
  )
}

export default NewDeputationPage
