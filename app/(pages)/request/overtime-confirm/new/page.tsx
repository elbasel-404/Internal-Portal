import { Instructions, CreateRequestStatus } from "@components"
import { getCreateRequestStatus, getOvertimeList } from "@server"
import { OvertimeConfirmForm } from "../components"

const NewOvertimeConfirmPage = async () => {
  const requestStatus = await getCreateRequestStatus("hr.overtime.request")
  const assignmentNumbers = await getOvertimeList()

  const requestCaption = "انت الان في مرحلة انشاء الطلب"
  return (
    <div className="space-y-4 mb-16">
      <CreateRequestStatus status={requestStatus} caption={requestCaption} />
      <OvertimeConfirmForm assignmentNumbers={assignmentNumbers} />
      <Instructions
        title="توضيحات حول الخدمة"
        description="تتيح هذه الخدمة للموظف امكانية تقديم طلب تأكيد للعمل الاضافي علي النظام لاخد الموافقات اللازمة لاعتماد الوقت الاضافي بعد تنفيذ التكليف. يتم تعبئة الطلب بالبيانات الاساسية ويجب علي الموظف التأكيد من تأكيد العمل الاضافي."
      />
    </div>
  )
}

export default NewOvertimeConfirmPage
