import { CreateRequestStatus } from "@components"
import { getUser } from "@db/actions"
import { getCreateRequestStatus, getPurchaseFields, getUserId } from "@server"
import { PurchaseForm } from "../components"

const NewPurchasePage = async () => {
  const userId = await getUserId()
  if (!userId) return

  const { projectCompletion, products } = await getUser(userId)
  // const requestStatus = await getRequestStatus("", "")
  const purchaseTypes = await getPurchaseFields("type")
  const purchasePlanTypes = await getPurchaseFields("strategic_plan_type_id")
  const purchaseInitiative = await getPurchaseFields("purchase_initiative_id")
  const purchaseProgram = await getPurchaseFields("purchase_program_id")
  const purchasePaymentTypes = await getPurchaseFields("direct_payment_type_id")
  const purchaseResourceName = await getPurchaseFields("payment_partner_id")
  const requestStatus = await getCreateRequestStatus("purchase.request")
  const requestCaption =
    "انت الان في مرحلة انشاء الطلب و بانتظار موافقة المدير المباشر"
  return (
    <div className="space-y-4 mb-16">
      <CreateRequestStatus status={requestStatus} caption={requestCaption} />
      <PurchaseForm
        projectCompletionData={projectCompletion}
        productsData={products}
        purchaseTypes={purchaseTypes}
        purchasePlanTypes={purchasePlanTypes}
        purchaseInitiative={purchaseInitiative}
        purchasePaymentTypes={purchasePaymentTypes}
        purchaseProgram={purchaseProgram}
        purchaseResourceName={purchaseResourceName}
      />
    </div>
  )
}

export default NewPurchasePage
