import { Instructions, RequestDetails, RequestStatus, Table } from "@components"
import { CheckboxField, RadioField } from "@components/form"
import { getChangeContractDetails, getRequestStatus } from "@server"
import { RequestHeader } from "@types"

type Params = Promise<{ id: string }>

interface ChangeContractDetailsPageProps {
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

const ChangeContractDetailsPage = async ({
  params,
}: ChangeContractDetailsPageProps) => {
  const { id } = await params
  const model = "manage.financial.custody"
  const requestStatus = await getRequestStatus(id, model)
  const {
    applicantName,
    attachments,
    awardAmount,
    changeJustification,
    changeType,
    commpletionRate,
    competitionName,
    contractExpirationDate,
    increaseAmount,
    increasePercentage,
    newItem,
    periodExtensionOrReduction,
    productsAfterChange,
    productsBeforeChange,
    proposedChanges,
    purchaseOrderNumber,
    reductionAmount,
    reductionPercentage,
    refuseReason,
    requestChangeId,
    requestDate,
  } = (await getChangeContractDetails(id)) || {}

  const requestHeaders: RequestHeader[] = [
    {
      label: "رقم طلب التغيير",
      value: requestChangeId,
    },
    {
      label: "سبب الرفض",
      value: refuseReason,
    },
    {
      label: "رقم أمر الشراء",
      value: purchaseOrderNumber,
    },
    {
      label: "مبلغ الترسية",
      value: awardAmount,
    },
    {
      label: "نسبة الإنجاز",
      value: commpletionRate,
    },
    {
      label: "اسم المنافسة",
      value: competitionName,
    },
    {
      label: "وصف التغييرات المقترحة",
      value: proposedChanges,
    },
    {
      label: "مبررات التغيير",
      value: changeJustification,
    },
    {
      label: "صاحب الطلب",
      value: applicantName,
    },
    {
      label: "تاريخ الطلب",
      value: requestDate,
    },
    {
      label: "نوع التغيير",
      value: (
        <div className="flex flex-wrap gap-12">
          {changeType?.map((method, index) => (
            <div key={index} className="flex items-center gap-2">
              <CheckboxField
                label={""}
                name={""}
                className="rounded-[3px] shadow-none space-y-0 mt-2"
                checked={method.checked}
              />
              <label className="font-medium text-foreground">
                {method.name}
              </label>
            </div>
          ))}
        </div>
      ),
    },
    {
      label: "هل طلب التغيير يتطلب بند مستحدث؟",
      value: (
        <RadioField
          name=""
          options={
            newItem?.map((item) => ({ value: item.name, label: item.name })) ??
            []
          }
          required={true}
          selectedValue={newItem?.find((item) => item.checked)?.name || ""}
          labelStyle="text-base"
          inline={false}
          radioStyle="flex flex-wrap gap-20"
        />
      ),
    },
    {
      label: "هل يتطلب تمديد المدة أو تخفيض المدة؟",
      value: (
        <RadioField
          name=""
          options={
            periodExtensionOrReduction?.map((item) => ({
              value: item.name,
              label: item.name,
            })) ?? []
          }
          required={true}
          selectedValue={
            periodExtensionOrReduction?.find((item) => item.checked)?.name || ""
          }
          labelStyle="text-base"
          inline={false}
          radioStyle="flex flex-wrap gap-20"
        />
      ),
    },
    {
      label: "تاريخ انتهاء العقد الجديد",
      value: contractExpirationDate,
    },
    {
      label: "مبلغ التخفيض في الطلب الحالي",
      value: reductionAmount,
    },
    {
      label: "مبلغ الزيادة في الطلب الحالي",
      value: increaseAmount,
    },
    {
      label: "مجموع النسب المئوية للتخفيض في المشروع",
      value: reductionPercentage,
    },
    {
      label: "مجموع النسب المئوية للزيادة في المشروع",
      value: increasePercentage,
    },
    {
      label: "المرفقات",
      value: attachments,
    },
  ]
  return (
    <main className="space-y-4">
      <RequestStatus status={requestStatus} />
      <RequestDetails headers={requestHeaders} />
      <div className="bg-white pt-4 pb-4 px-4 rounded-lg space-y-3">
        <h2 className="text-darkBlue font-semibold py-2 text-xl">
          المنتجات قبل التغيير
        </h2>
        <>
          <Table
            tableClassName="h-fit"
            columns={productTableHeaders}
            rows={productsBeforeChange ?? []}
            toggleId={false}
          />
        </>
        <h2 className="text-darkBlue font-semibold py-2 text-xl">
          المنتجات بعد التغيير
        </h2>
        <>
          <Table
            tableClassName="h-fit"
            columns={productTableHeaders}
            rows={productsAfterChange ?? []}
            toggleId={false}
          />
        </>
      </div>
      <Instructions
        title="توضيحات حول الخدمة"
        description="تحرص الهيئة العامة للمنشآت الصغيرة والمتوسطة"
      />
    </main>
  )
}

export default ChangeContractDetailsPage
