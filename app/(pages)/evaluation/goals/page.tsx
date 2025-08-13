import { Instructions, RequestGeneralData } from "@components"
import { getEvaluationGoals } from "@server"
import { EvaluationGoalsTable } from "./components"

const EvaluationGoalsListPage = async () => {
  const EvaluationGoalsData = await getEvaluationGoals()
  return (
    <div className="mb-12 space-y-6">
      <RequestGeneralData model="holidays" />
      <EvaluationGoalsTable data={EvaluationGoalsData} />
      <Instructions
        title="توضيحات حول الخدمة"
        description="تتيح هذه الخدمة للموظف امكانية الإطلاع على قائمة طلبات تخطيط الأداء."
      />
    </div>
  )
}

export default EvaluationGoalsListPage
