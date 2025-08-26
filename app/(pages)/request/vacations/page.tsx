import { Instructions } from "@components"
import { VacationTable } from "./components"
import { getVacationRequests } from "@server"


const VacationsListPage = async () => {
  const VacationRequests = await getVacationRequests()

  return (
    <div className="space-y-4 mb-12">
      <VacationTable data={VacationRequests} />
      <Instructions
        title="توضيحات حول الخدمة"
        description="تتيح هذه الخدمة للموظف إمكانية طلب إجازة. يتم تعبئة الطلب بالبيانات الأساسية ويجب على الموظف التأكد من تاريخ بداية ونهاية الإدارة."
      />
    </div>
  )
}

export default VacationsListPage
