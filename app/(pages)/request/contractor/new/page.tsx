import { CreateRequestStatus } from "@components"
import { getCreateRequestStatus } from "@server"
import { ContractorForm } from "../components"

export const dynamic = "force-dynamic"

const NewContractorPage = async () => {
  const requestStatus = await getCreateRequestStatus(
    "manage.financial.custody.close",
  )
  const requestCaption =
    "انت الان في مرحلة انشاء الطلب و بانتظار موافقة المدير المباشر"
  return (
    <div className="space-y-4 mb-16">
      <CreateRequestStatus status={requestStatus} caption={requestCaption} />
      <ContractorForm />
    </div>
  )
}

export default NewContractorPage
