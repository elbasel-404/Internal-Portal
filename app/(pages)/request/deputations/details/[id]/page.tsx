import { RequestDetails, RequestStatus } from "@components";
import { getRequestStatus, getDeputationRequestDetails } from "@server";
import { RequestHeader } from "@types";
import { ReactNode } from "react";
import { AnglesLeftIcon } from "@icons";

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
    trainingRequestNumber,
    kilometers,
    issueVisa,
    replacementEmployee,
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
    deputationPlaces,
  } = (await getDeputationRequestDetails(id)) || {};

  const isInternal = deputation === "داخلي";
  const displayReason = status === "مرفوض";
  const displayTrainingRequestNumber = deputationType === "رحلة تدريب";
  const displayKilometers = transportation === "برا";

  const requestHeaders: RequestHeader[] = [
    {
      label: "رقم الطلب",
      value: id,
    },
    {
      label: "انتداب",
      value: deputation,
    },
    {
      label: "نوع الانتداب",
      value: deputationType,
    },
    {
      label: "تاريخ الطلب",
      value: requestDate,
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
    ...(displayTrainingRequestNumber
      ? [
          {
            label: "رقم طلب التدريب" as RequestHeader["label"],
            value: trainingRequestNumber,
          },
        ]
      : []),
    ...(displayKilometers
      ? [
          {
            label: "عدد الكيلومترات" as RequestHeader["label"],
            value: kilometers,
          },
        ]
      : []),
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
      label: "تم حجز تذكرة السفر",
      value: reserved,
      key: "reserved",
    },
    ...(isInternal
      ? [
          {
            label: "المدينة" as RequestHeader["label"],
            value: city,
          },
        ]
      : [
          {
            label: "إصدار تأشيرة" as RequestHeader["label"],
            value: issueVisa,
            key: "issueVisa",
          },
          {
            label: "الموظف البديل" as RequestHeader["label"],
            value: replacementEmployee,
          },
        ]),
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
    ...(displayReason
      ? [
          {
            label: "سبب الرفض" as RequestHeader["label"],
            value: reason,
          },
        ]
      : []),
    {
      label: "ملاحظات" as RequestHeader["label"],
      value: notes,
    },
    ...(isInternal
      ? []
      : [
          {
            label: "مكان الانتداب" as RequestHeader["label"],
            value: deputationPlaces as ReactNode,
            tableHeaders: [
              { label: "الدولة", key: "name" },
              { label: "المدينة", key: "city" },
            ],
          },
        ]),
    {
      label: "المرفقات" as RequestHeader["label"],
      value: attachments,
    },
  ];

  return (
    <main className="space-y-4">
      <RequestStatus status={requestStatus} caption={requestCaption} />
      <RequestDetails headers={requestHeaders} />
      <button
        type="submit"
        className="w-full flex font-medium justify-center rounded-lg items-center gap-2 bg-primary text-white px-4 py-1 border-2 border-primary"
      >
        تأكيد الانتداب
        <AnglesLeftIcon width={18} height={18} className="fill-white" />
      </button>
    </main>
  );
};

export default WorkDocumentDetailsPage;
