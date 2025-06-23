import { getStoredEmployeeId } from "@auth"
import { Instructions, CreateRequestStatus } from "@components"
import { getEmployeeMembersFields, getCreateRequestStatus } from "@server"
import { EmployeeMembersForm } from "../components"

const NewEmployeeMembersPage = async () => {
  const employeeId = await getStoredEmployeeId()
  const requestStatus = await getCreateRequestStatus("hr.employee.members")
  const requestTypeField = await getEmployeeMembersFields("type")
  const memberField = await getEmployeeMembersFields("members")
  const relativeRelationField =
    await getEmployeeMembersFields("relative_relation")

  const requestCaption =
    "انت الان في مرحلة انشاء الطلب و بانتظار موافقة المدير المباشر"
  return (
    <div className="space-y-4 mb-16">
      <CreateRequestStatus status={requestStatus} caption={requestCaption} />
      <EmployeeMembersForm
        employeeId={employeeId}
        memberField={memberField}
        relativeRelationField={relativeRelationField}
        requestTypeField={requestTypeField}
      />
      <Instructions
        title="توضيحات الخدمة"
        description="تتيح هذة الخدمة للموظف امكانية تقديم طلب تحديث افراد الاسرة, يتم تعبئة الطلب بالبيانات الاساسية ويجب على الموظف التأكد من معطيات افراد الاسرة"
      />
    </div>
  )
}

export default NewEmployeeMembersPage
