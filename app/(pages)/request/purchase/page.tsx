import { Instructions, RequestGeneralData } from "@components"
import { getPurchaseRequests } from "@server"
import { PurchaseTable } from "./components"

const PurchaseListPage = async () => {
  const purchaseData = await getPurchaseRequests()
  return (
    <div className="space-y-6 mb-12">
      <RequestGeneralData model="purchase_request" />

      <PurchaseTable data={purchaseData} />
      <Instructions
        title="توضيحات حول الخدمة"
        description="تتيح هذه الخدمة للموظف إمكانية تقديم طلب أمر شراء، يتم تعبئة الطلب بالبيانات الأساسية ويجب على الموظف التأكد من الحقول اللازمة."
      />
    </div>
  )
}

export default PurchaseListPage
