import { CreateRequestStatus } from "@components"
import { getCreateRequestStatus } from "@server"
import { WorkDocumentForm } from "../components"

const NewWorkDocumentPage = async () => {
  const requestStatus = await getCreateRequestStatus("base.issue.document")
  // const employeeId = await getStoredEmployeeId")
  const requestCaption =
    "انت الان في مرحلة انشاء الطلب و بانتظار موافقة المدير المباشر"
  return (
    <div className="space-y-4 mb-16">
      <CreateRequestStatus status={requestStatus} caption={requestCaption} />
      <WorkDocumentForm />
    </div>
  )
}

export default NewWorkDocumentPage
