import { CreateRequestStatus } from "@components"
import { getCreateRequestStatus } from "@server"
import { JobApplicationsForm } from "../components"

const NewJobApplicationPage = async () => {
  const requestStatus = await getCreateRequestStatus("hr.job.request")
  // ! TODO: Add server action:
  const requestCaption =
    "انت الان في مرحلة انشاء الطلب و بانتظار موافقة المدير المباشر"
  return (
    <div className="space-y-4 mb-16">
      <CreateRequestStatus status={requestStatus} caption={requestCaption} />
      <JobApplicationsForm />
    </div>
  )
}

export default NewJobApplicationPage
