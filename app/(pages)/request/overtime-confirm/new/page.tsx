import { Instructions, RequestStatus } from "@components"
import { getRequestStatus } from "@server"
import { OvertimeConfirmForm } from "../components"

const NewOvertimeConfirmPage = async () => {
  const requestStatus = await getRequestStatus()
  const requestCaption =
    "انت الان في مرحلة انشاء الطلب و بانتظار موافقة المدير المباشر"
  return (
    <div className="space-y-4 mb-16">
      <RequestStatus status={requestStatus} caption={requestCaption} />
      <OvertimeConfirmForm />
      <Instructions
        title="توضيحات حول الخدمة"
        description="تتيح هذه الخدمة للموظف امكانية تقديم طلب تأكيد للعمل الاضافي علي النظام لاخد الموافقات اللازمة لاعتماد الوقت الاضافي بعد تنفيذ التكليف. يتم تعبئة الطلب بالبيانات الاساسية ويجب علي الموظف التأكيد من تأكيد العمل الاضافي."
      />
    </div>
  )
}

export default NewOvertimeConfirmPage
