import { RequestDetails, RequestStatus, Table } from "@components"
import { RiyalCurrencyIcon } from "@icons"
import { paths } from "@lib"
import { getPurchaseOrderDetails, getRequestStatus } from "@server"
import { RequestHeader } from "@types"
import { Button } from "@ui"
import Link from "next/link"

type Params = Promise<{ id: string }>

interface PurchaseOrderDetailsPageProps {
  params: Params
}

const productTableHeaders = [
  { label: "التصنيف" },
  { label: "المنتج" },
  { label: "الوصف" },
  { label: "الكمية" },
  { label: "سعر الوحدة" },
  { label: "الضريبة" },
  { label: "الإجمالي بعد الضريبة" },
]

const PurchaseOrderDetailsPage = async ({
  params,
}: PurchaseOrderDetailsPageProps) => {
  const { id } = await params
  const model = "manage.financial.custody"
  const requestStatus = await getRequestStatus(id, model)
  const {
    purchaseRequestId,
    contractDuration,
    contractEndDate,
    contractStartDate,
    contractNumber,
    contractType,
    costs,
    description,
    initiativeName,
    planType,
    products,
    purchaseOrderNumber,
    purchaseRequestDate,
    programName,
    remainingAmount,
    requestAddress,
    requestOutcomes,
    resourceName,
    spentAmount,
    type,
    awardAmount,
    totalAmount,
  } = (await getPurchaseOrderDetails(id)) || {}

  const purchaseRequsetDetails: RequestHeader[] = [
    { label: "رقم طلب الشراء", value: purchaseRequestId },
    { label: "تاريخ طلب الشراء", value: purchaseRequestDate },
    { label: "النوع", value: type },
    { label: "الوصف", value: description },
    {
      label: "التكاليف",
      value: (
        <div className="flex gap-2">
          {costs?.replace("ريال سعودي", "")}
          <RiyalCurrencyIcon />
        </div>
      ),
    },
    { label: "مخرجات الطلب", value: requestOutcomes },
    { label: "نوع الخطة", value: planType },
    { label: "اسم المبادرة", value: programName },
    { label: "اسم البرنامج", value: initiativeName },
    { label: "عنوان الطلب", value: requestAddress },
  ]
  const purchaseOrderDetails: RequestHeader[] = [
    { label: "رقم أمر الشراء", value: purchaseOrderNumber },
    { label: "المورد", value: resourceName },
    {
      label: "مبلغ الترسية",
      value: (
        <div className="flex gap-2">
          {awardAmount?.replace("ريال سعودي", "")}
          <RiyalCurrencyIcon />
        </div>
      ),
    },
    {
      label: "المبلغ المنصرف",
      value: (
        <div className="flex gap-2">
          {spentAmount?.replace("ريال سعودي", "")}
          <RiyalCurrencyIcon />
        </div>
      ),
    },
    {
      label: "المبلغ المتبقي",
      value: (
        <div className="flex gap-2">
          {remainingAmount?.replace("ريال سعودي", "")}
          <RiyalCurrencyIcon />
        </div>
      ),
    },
  ]
  const contractDetails: RequestHeader[] = [
    { label: "رقم العقد", value: contractNumber },
    { label: "تاريخ بداية العقد", value: contractStartDate },
    { label: "تاريخ نهاية العقد", value: contractEndDate },
    { label: "مدة العقد", value: contractDuration },
    { label: "نوع العقد", value: contractType },
  ]

  // const requestCaption =
  //   "انت الان في مرحلة انشاء الطلب و بانتظار موافقة المدير المباشر"
  return (
    <main className="space-y-4">
      <RequestStatus status={requestStatus} />
      <RequestDetails
        headers={purchaseRequsetDetails}
        requestDetailsLabel="تفاصيل طلب الشراء"
      />
      <RequestDetails
        headers={purchaseOrderDetails}
        requestDetailsLabel="تفاصيل أمر الشراء"
      />
      <RequestDetails
        headers={contractDetails}
        requestDetailsLabel="تفاصيل العقد"
      />
      <div className="bg-white pt-4 pb-4 px-4 rounded-lg space-y-3">
        <h2 className="text-darkBlue font-semibold py-2 text-xl">المنتجات</h2>
        <>
          <Table
            tableClassName="h-fit"
            columns={productTableHeaders}
            rows={products ?? []}
            toggleId={false}
          />
          <div className="p-4 bg-cloudGray flex items-center justify-end pl-20 gap-4 sm:gap-8">
            <p className="text-foreground font-medium">الإجمالي </p>
            <span className="flex items-center gap-2 text-foreground font-medium text-xl">
              {totalAmount?.replace("ريال سعودي", "").trim()}
              <RiyalCurrencyIcon />
            </span>
          </div>
        </>
      </div>
      <div className="flex justify-end gap-3">
        <Link href={paths.changeContract.href}>
          <Button className="bg-primary-opacity text-primary p-4 shadow-none hover:bg-primary hover:text-primary-foreground">
            طلبات التغيير
          </Button>
        </Link>

        <Link href={paths.changeContractNew.href}>
          <Button className="bg-success text-success-foreground p-4 shadow-none hover:bg-success-foreground hover:text-white">
            إنشاء طلبات التغيير
          </Button>
        </Link>
      </div>
    </main>
  )
}

export default PurchaseOrderDetailsPage
