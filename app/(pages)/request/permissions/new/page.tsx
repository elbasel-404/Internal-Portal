import { CreateRequestStatus } from "@components"
import { getCreateRequestStatus } from "@server"
import { PermissionForm } from "../components"

const NewPermissionPage = async () => {
  const model = "hr.authorization"
  const requestStatus = await getCreateRequestStatus(model)
  // ! TODO: Add server action:
  const requestCaption = "انت الان في مرحلة انشاء الطلب"
  return (
    <div className="space-y-4 mb-16">
      <CreateRequestStatus status={requestStatus} caption={requestCaption} />
      <PermissionForm />
    </div>
  )
}

export default NewPermissionPage
