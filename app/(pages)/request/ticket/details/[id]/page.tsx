import { Instructions, RequestDetails, RequestStatus } from "@components"
import { getRequestStatus, getTicketDetails } from "@server"
import { RequestHeader } from "@types"
import { CommentSection } from "../../components"

type Params = Promise<{ id: string }>

interface TicketDetailsPageProps {
  params: Params
}

const TicketDetailsPage = async ({ params }: TicketDetailsPageProps) => {
  const { id } = await params
  // const requestCaption =
  //   "انت الان في مرحلة انشاء الطلب و بانتظار موافقة المدير المباشر"
  // const requestStatus = await getRequestStatus(id, "helpdesk.ticket")
  const {
    requestDate,
    subject,
    technicalTeam,
    predicate,
    priority,
    category,
    location,
    state,
    description,
    descriptionSolution,
    attachments,
  } = (await getTicketDetails(id)) || {}

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
      label: "الموضوع",
      value: subject,
    },
    {
      label: "فريق الدعم الفني",
      value: technicalTeam,
    },
    {
      label: "مسند إلي",
      value: predicate,
    },
    {
      label: "الأولوية",
      value: priority,
    },
    {
      label: "الفئة",
      value: category,
    },
    {
      label: "الموقع",
      value: location,
    },
    {
      label: "الحالة",
      value: state,
    },
    {
      label: "الوصف",
      value: description,
    },
    {
      label: "وصف حل المشكلة",
      value: descriptionSolution,
    },
    {
      label: "المرفقات",
      value: attachments,
    },
  ]
  return (
    <main className="space-y-4">
      {/* <RequestStatus status={requestStatus} /> */}
      <RequestDetails headers={requestHeaders} />
      <CommentSection />
      <Instructions
        title="توضيحات حول الخدمة"
        description="تتيح لك هذه الخدمة إرسال تذكرة طلب خدمة أو دعم فني للموظف المختصص على النظام. يمكن لك تتبع حالة التذكرة بعد الارسال وأيضاً يتاح لك التعليق في حالة الرد على التذكرة."
      />
    </main>
  )
}

export default TicketDetailsPage
