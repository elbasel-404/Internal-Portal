import { CreateRequestStatus } from "@components"
import { getUser } from "@db/actions"
import { getCreateRequestStatus, getUserId } from "@server"
import { PurchaseForm } from "../components"

const NewPurchasePage = async () => {
  const userId = await getUserId()
  if (!userId) return

  const { projectCompletion, products } = await getUser(userId)
  // const requestStatus = await getRequestStatus("", "")
  const requestStatus = await getCreateRequestStatus("purchase.request")
  const requestCaption =
    "انت الان في مرحلة انشاء الطلب و بانتظار موافقة المدير المباشر"
  return (
    <div className="space-y-4 mb-16">
      <CreateRequestStatus status={requestStatus} caption={requestCaption} />
      <PurchaseForm
        projectCompletionData={projectCompletion}
        productsData={products}
      />
    </div>
  )
}

export default NewPurchasePage
