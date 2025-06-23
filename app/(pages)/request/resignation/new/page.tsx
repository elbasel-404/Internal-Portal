import { CreateRequestStatus } from "@components"
import { getCreateRequestStatus } from "@server"
import { ResignationForm } from "../components"

const NewResignationPage = async () => {
  const requestStatus = await getCreateRequestStatus("hr.resignation")
  const requestCaption =
    "انت الان في مرحلة انشاء الطلب و بانتظار موافقة المدير المباشر"
  return (
    <div className="space-y-4 mb-16">
      <CreateRequestStatus status={requestStatus} caption={requestCaption} />
      <ResignationForm />
    </div>
  )
}

export default NewResignationPage
