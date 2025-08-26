import {
    getOrdersListAgreementRequests,
    getOrdersListPurchaseRequests,
} from "@server"
import { OrdersListTable } from "./components"

const OrdersListPage = async () => {
  const ordersListPurchaseData = await getOrdersListPurchaseRequests()
  const ordersListAgreementeData = await getOrdersListAgreementRequests()
  return (
    <div className="space-y-4 mb-12">
      <OrdersListTable
        purchaseData={ordersListPurchaseData}
        agreementData={ordersListAgreementeData}
      />
    </div>
  )
}

export default OrdersListPage
