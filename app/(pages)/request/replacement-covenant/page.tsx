import { Instructions, RequestGeneralData } from "@components"
import { getReplacementCovenantRequests } from "@server"
import { ReplacementCovenantTable } from "./components"

const ReplacementCovenantListPage = async () => {
  const replacementCovenantData = await getReplacementCovenantRequests()
  return (
    <div className="space-y-4 mb-12">
      <RequestGeneralData model="custody_close" />

      <ReplacementCovenantTable data={replacementCovenantData} />
      <Instructions
        title="توضيحات حول الخدمة"
        description="تتيح هذه الخدمة للموظف إمكانية تقديم طلب العهدة، يتم تعبئة الطلب بالبيانات الأساسية ويجب على الموظف التأكد من معطيات طلب العهدة."
      />
    </div>
  )
}

export default ReplacementCovenantListPage
