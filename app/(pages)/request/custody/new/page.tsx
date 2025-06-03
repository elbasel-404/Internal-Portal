import { CreateRequestStatus } from "@components"
import { getCreateRequestStatus } from "@server"
import { CustodyForm } from "../components"

export const dynamic = "force-dynamic"

const NewReplacementCovenantPage = async () => {
  const model = "manage.financial.custody"
  const requestStatus = await getCreateRequestStatus(model)
  const requestCaption =
    "انت الان في مرحلة انشاء الطلب و بانتظار موافقة المدير المباشر"
  return (
    <div className="space-y-4 mb-16">
      <CreateRequestStatus status={requestStatus} caption={requestCaption} />
      <CustodyForm />
    </div>
  )
}

export default NewReplacementCovenantPage
