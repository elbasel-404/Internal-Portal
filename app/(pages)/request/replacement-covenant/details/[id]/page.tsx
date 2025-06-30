import { Instructions, RequestDetails, RequestStatus, Table } from "@components"
import {
  getCovenantDetails,
  getReplacementCovenantDetails,
  getRequestStatus,
} from "@server"
import { RequestHeader } from "@types"

type Params = Promise<{ id: string }>

interface ReplacementCovenantDetailsPageProps {
  params: Params
}

const tableHeaders = [
  { label: "المنتج" },
  { label: "البيان" },
  { label: "المبلغ" },
  { label: "رقم الفاتورة" },
  { label: "المرفقات" },
]

const ReplacementCovenantDetailsPage = async ({
  params,
}: ReplacementCovenantDetailsPageProps) => {
  const { id } = await params
  // const requestCaption =
  //   "انت الان في مرحلة انشاء الطلب و بانتظار موافقة المدير المباشر"
  const requestStatus = await getRequestStatus(
    id,
    "manage.financial.custody.close",
  )
  const {
    date,
    pledgeAmount,
    pledgeType,
    covenantRequestNumber,
    covenantPurpose,
    covenantAmount,
    covenantDate,
  } = (await getReplacementCovenantDetails(id)) || {}
  const covenantDetailsData = await getCovenantDetails()

  const convertedCovenantDetailsData = covenantDetailsData.map(
    (covenantDetails, index) => ({
      ...covenantDetails,
      id: index + "id",
    }),
  )

  const requestHeaders: RequestHeader[] = [
    {
      label: "رقم الطلب",
      value: id,
    },
    {
      label: "تاريخ طلب استعاضة/اقفال عهدة",
      value: date,
    },
    {
      label: "مبلغ استعاضة/اقفال عهدة",
      value: pledgeAmount,
    },
    {
      label: "نوع استعاضة/اقفال عهدة",
      value: pledgeType,
    },
    {
      label: "رقم طلب العهدة",
      value: covenantRequestNumber,
    },
    {
      label: "الغرض من العهدة",
      value: covenantPurpose,
    },
    {
      label: "مبلغ العهدة",
      value: covenantAmount,
    },
    {
      label: "تاريخ العهدة",
      value: covenantDate,
    },
  ]
  return (
    <main className="space-y-4">
      <RequestStatus status={requestStatus} />
      <RequestDetails headers={requestHeaders} />
      <div className="bg-primary-opacity py-6 px-[18px] border-r-4 border-r-primary">
        <h2 className="text-primary font-bold text-xl">
          تفاصيل استعاضة/إقفال عهدة
        </h2>
      </div>
      <Table
        tableClassName="h-fit"
        columns={tableHeaders}
        rows={convertedCovenantDetailsData}
        toggleId={false}
      />
      <Instructions
        title="توضيحات حول الخدمة"
        description="تتيح هذه الخدمة للموظف إمكانية تقديم طلب العهدة، يتم تعبئة الطلب بالبيانات الأساسية ويجب على الموظف التأكد من معطيات طلب العهدة."
      />
    </main>
  )
}

export default ReplacementCovenantDetailsPage
