import { RequestStatus } from "@components"
import { getRequestStatus } from "@server"
import { ResignationForm } from "../components"

const NewResignationPage = async () => {
  const requestStatus = await getRequestStatus("", "")
  const requestCaption =
    "انت الان في مرحلة انشاء الطلب و بانتظار موافقة المدير المباشر"
  return (
    <div className="space-y-4 mb-16">
      <RequestStatus status={requestStatus} caption={requestCaption} />
      <ResignationForm />
    </div>
  )
}

export default NewResignationPage
