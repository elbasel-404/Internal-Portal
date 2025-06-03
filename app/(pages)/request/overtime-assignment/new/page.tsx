import { Instructions, RequestStatus } from "@components"
import { getRequestStatus } from "@server"
import { OvertimeAssignmentForm } from "../components"

const NewOvertimeAssignmentPage = async () => {
  const requestStatus = await getRequestStatus()
  const requestCaption =
    "انت الان في مرحلة انشاء الطلب و بانتظار موافقة المدير المباشر"
  return (
    <div className="space-y-4 mb-16">
      <RequestStatus status={requestStatus} caption={requestCaption} />
      <OvertimeAssignmentForm />
      <Instructions
        title="توضيحات حول الخدمة"
        description="تتيح هذه الخدمة للموظف امكانية طلب التكليف للعمل الاضافي علي النظام لاخد الموافقات اللازمة للتكليف. يتم تعبئة الطلب بالبيانات الاساسية ويجب علي الموظف التأكد من معطيات التكليف"
      />
    </div>
  )
}

export default NewOvertimeAssignmentPage
