import { CreateRequestStatus, Instructions } from "@components"

import { getCreateRequestStatus } from "@server"
import { EvaluationForm } from "../components"

const NewEvaluationPage = async () => {
  const model = "hr.holidays"
  const requestStatus = await getCreateRequestStatus(model)
  const requestCaption = "انت الان في مرحلة انشاء الطلب"
  return (
    <div className="space-y-4 mb-16">
      <CreateRequestStatus status={requestStatus} caption={requestCaption} />
      <EvaluationForm />
      <Instructions
        title="توضيحات حول الخدمة"
        description="تتيح هذه الخدمة للموظف امكانية الاطلاع علي تفاصيل طلب تقييم أداء المتعاقدين.."
      />
    </div>
  )
}

export default NewEvaluationPage
