import { RequestDetails, RequestStatus } from "@components";
import { getRequestStatus, getDeputationRequestDetails } from "@server";
import { RequestHeader } from "@types";

type Params = Promise<{ id: string }>;

interface WorkDocumentDetailsPageProps {
  params: Params;
}

const WorkDocumentDetailsPage = async ({
  params,
}: WorkDocumentDetailsPageProps) => {
  const { id } = await params;
  const requestStatus = await getRequestStatus();
  const requestCaption =
    "انت الان في مرحلة انشاء الطلب و بانتظار موافقة المدير المباشر";
  const {
    requestDate,
    deputation,
    transportation,
    startDate,
    endDate,
    duration,
    city,
    deputationType,
    task,
    taskDetails,
    departureDatesStatus,
    travelDuration,
    travelStartDate,
    travelEndDate,
    deputationAmount,
    transferDate,
    reserved,
    status,
    reason,
    notes,
    attachments,
  } = (await getDeputationRequestDetails(id)) || {};

  const displayReason = status === "مرفوض" ? reason : null;

  const requestHeaders: RequestHeader[] = [
    {
      label: "رقم الطلب",
      value: id,
    },
    {
      label: "تاريخ الطلب",
      value: requestDate,
    },
    {
      label: "انتداب",
      value: deputation,
    },
    {
      label: "وسيلة النقل",
      value: transportation,
    },
    {
      label: "تاريخ بداية الانتداب",
      value: startDate,
    },
    {
      label: "تاريخ نهاية الانتداب",
      value: endDate,
    },
    {
      label: "المدة",
      value: duration,
    },
    {
      label: "المدينة",
      value: city,
    },
    {
      label: "نوع الانتداب",
      value: deputationType,
    },
    {
      label: "المهمة",
      value: task,
    },
    {
      label: "تفاصيل المهمة",
      value: taskDetails,
    },
    {
      label: "اعداد تواريخ السفر",
      value: departureDatesStatus,
    },
    {
      label: "أيام السفر",
      value: travelDuration,
    },
    {
      label: "تاريخ السفر للانتداب",
      value: travelStartDate,
    },
    {
      label: "تاريخ العودة للانتداب",
      value: travelEndDate,
    },
    {
      label: "بدل الانتداب (بالريال)",
      value: deputationAmount,
    },
    {
      label: "تاريخ التحويل",
      value: transferDate,
    },
    {
      label: "تم حجز تذكرة السفر",
      value: reserved,
    },
    ...(displayReason
      ? [
          {
            label: "سبب الرفض" as RequestHeader["label"],
            value: reason,
          },
        ]
      : []),
    ...[
      {
        label: "ملاحظات" as RequestHeader["label"],
        value: notes,
      },
      {
        label: "المرفقات" as RequestHeader["label"],
        value: attachments,
      },
    ],
  ];

  return (
    <main className="space-y-4">
      <RequestStatus status={requestStatus} caption={requestCaption} />
      <RequestDetails headers={requestHeaders} />
    </main>
  );
};

export default WorkDocumentDetailsPage;
