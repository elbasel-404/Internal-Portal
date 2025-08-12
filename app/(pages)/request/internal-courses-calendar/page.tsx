import { Instructions, RequestGeneralData } from "@components"
import { getInternalCoursesRequests } from "@server"
import { InternalCoursesTable } from "./components"

const InternalCoursesCalendarListPage = async () => {
  const internalCoursesData = await getInternalCoursesRequests()
  return (
    <div className="space-y-4 mb-12">
      <RequestGeneralData model="training_public" />

      <InternalCoursesTable data={internalCoursesData} />
      <Instructions
        title="توضيحات حول الخدمة"
        description="تتيح هذه الخدمة للموظف إمكانية عرض وتقديم الترشح للدورات الداخلية."
      />
    </div>
  )
}

export default InternalCoursesCalendarListPage
