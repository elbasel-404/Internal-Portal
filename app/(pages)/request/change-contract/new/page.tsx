import { CreateRequestStatus, Instructions } from "@components"
import { getCreateRequestStatus, getPurchaseOrderProducts } from "@server"
import { ChangeContractForm } from "../components"

const NewChangeContractPage = async () => {
  const products = await getPurchaseOrderProducts()
  const model = "manage.financial.custody"
  const requestStatus = await getCreateRequestStatus(model)
  const requestCaption =
    "انت الان في مرحلة انشاء الطلب و بانتظار موافقة المدير المباشر"
  return (
    <div className="space-y-4 mb-16">
      <CreateRequestStatus status={requestStatus} caption={requestCaption} />
      <ChangeContractForm productsData={products} />
      <Instructions
        title="توضيحات حول الخدمة"
        description="تتيح هذه الخدمة للموظف امكانية تقديم طلب تغيير امر الشراء / العقد.يتم تعبئة الطلب بالبيانات الاساسية(*) حقول ضرورية"
      />
    </div>
  )
}

export default NewChangeContractPage
