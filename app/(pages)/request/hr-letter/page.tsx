import { Instructions } from "@components"
import { getHrLetterRequests } from "@server"
import { HrLetterTable } from "./components"

const HrLetterListPage = async () => {
  const hrLetterData = await getHrLetterRequests()
  return (
    <div className="space-y-4 mb-12">
      <HrLetterTable data={hrLetterData} />
      <Instructions
        title="توضيحات حول الخدمة"
        description="تتيح هذه الخدمة للموظف إمكانية تقديم طلب خطاب للموارد البشرية يتم تعبئة الطلب بالبيانات الأساسية ويجب على الموظف التأكد من معطيات خطاب الموارد البشرية"
      />
    </div>
  )
}

export default HrLetterListPage
