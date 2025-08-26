import { CreateRequestStatus } from "@components"
import { ContractorForm } from "../components"
import { getContractorRequestWorkflow } from "../components/getContractorRequestWorkflow"
import { getPurchaseData } from "../components/getPurchase"
import { getAttachmentData } from "../components/getAttachment"

const NewContractorPage = async () => {
  const requestStatus = await getContractorRequestWorkflow()
  const purchaseList = await getPurchaseData()
  const attachmentsList = await getAttachmentData()
  const requestCaption =
    "انت الان في مرحلة انشاء الطلب و بانتظار موافقة المدير المباشر"
  return (
    <div className="space-y-4 mb-16">
      <CreateRequestStatus status={requestStatus} caption={requestCaption} />
      <ContractorForm
        purchaseList={purchaseList}
        attachmentsList={attachmentsList}
      />
    </div>
  )
}

export default NewContractorPage
