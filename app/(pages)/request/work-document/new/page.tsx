import { RequestStatus } from "@components"
import { getRequestStatus } from "@server"
import { WorkDocumentForm } from "../components"

const NewWorkDocumentPage = async () => {
  const requestStatus = await getRequestStatus("", "")
  const requestCaption =
    "انت الان في مرحلة انشاء الطلب و بانتظار موافقة المدير المباشر"
  return (
    <div className="space-y-4 mb-16">
      <RequestStatus status={requestStatus} caption={requestCaption} />
      <WorkDocumentForm />
    </div>
  )
}

export default NewWorkDocumentPage
