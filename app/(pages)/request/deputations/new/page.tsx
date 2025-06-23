import { CreateRequestStatus } from "@components"
import { getCreateRequestStatus } from "@server"
import { DeputationForm } from "../components"

const NewDeputationPage = async () => {
  const requestStatus = await getCreateRequestStatus("hr.deputation")
  const requestCaption =
    "انت الان في مرحلة انشاء الطلب و بانتظار موافقة المدير المباشر"
  return (
    <div className="space-y-4 mb-16">
      <CreateRequestStatus status={requestStatus} caption={requestCaption} />
      <DeputationForm />
    </div>
  )
}

export default NewDeputationPage
