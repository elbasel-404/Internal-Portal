import {
  Instructions,
  ProductsTableSection,
  RequestDetails,
  RequestStatus,
} from "@components"
import { getPurchaseDetails, getUserId } from "@server"
import { RequestHeader, RequestLabel } from "@types"
import { requestStatus } from "../../config"
import { BatchTableSection } from "./sections/BatchTableSection"

type Params = Promise<{ id: string }>

interface PurchaseDetailsPageProps {
  params: Params
}

const PurchaseDetailsPage = async ({ params }: PurchaseDetailsPageProps) => {
  const { id } = await params
  const userId = await getUserId()
  if (!userId) return

  // const { batchs } = await getUser(userId)

  const {
    requestDate,
    type,
    requestTitle,
    requestOutcomes,
    description,
    projectName,
    programName,
    planType,
    paymentType,
    payment_partner,
    totalAmount,
    awardAmount,
    awardAmountBeforeChange,
    attachments,
    purchaseProducts,
    payments,
  } = (await getPurchaseDetails(id)) || {}

  const requestHeaders: RequestHeader[] = [
    { label: "رقم الطلب" as RequestLabel, value: id },
    { label: "تاريخ الطلب" as RequestLabel, value: requestDate },
    { label: "النوع" as RequestLabel, value: type },
    { label: "عنوان الطلب" as RequestLabel, value: requestTitle },
    { label: "الوصف" as RequestLabel, value: description },
    { label: "مخرجات الطلب" as RequestLabel, value: requestOutcomes },
    { label: "نوع الخطة" as RequestLabel, value: planType },
    { label: "اسم (المبادرة/البرنامج)" as RequestLabel, value: programName },
    { label: "اسم المشروع" as RequestLabel, value: projectName },
    ...(type === "direct_payment"
      ? [
          { label: "نوع الدفعة" as RequestLabel, value: paymentType },
          { label: "نوع المورد" as RequestLabel, value: payment_partner },
        ]
      : []),
    {
      label: "التكاليف (التكلفة الإجمالية للمشروع)" as RequestLabel,
      value: totalAmount,
    },
    { label: "مبلغ الترسية" as RequestLabel, value: awardAmount },
    {
      label: "مبلغ الترسية قبل التغيير" as RequestLabel,
      value: awardAmountBeforeChange,
    },
    { label: "المرفقات" as RequestLabel, value: attachments },
  ]

  // const requestCaption =
  //   "انت الان في مرحلة انشاء الطلب و بانتظار موافقة المدير المباشر"

  return (
    <main className="space-y-4">
      <RequestStatus status={requestStatus} />
      <RequestDetails headers={requestHeaders} />
      {Array.isArray(purchaseProducts) && purchaseProducts.length > 0 && (
        <ProductsTableSection
          requestStatus={requestStatus}
          productsData={purchaseProducts}
          totalAmount={totalAmount}
        />
      )}
      <BatchTableSection requestStatus={requestStatus} payments={payments} />
      <Instructions
        title="توضيحات حول الخدمة"
        description="تتيح هذه الخدمة للموظف إمكانية تقديم طلب أمر شراء، يتم تعبئة الطلب بالبيانات الأساسية ويجب على الموظف التأكد من الحقول اللازمة."
      />
    </main>
  )
}

export default PurchaseDetailsPage
