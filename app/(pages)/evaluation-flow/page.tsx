import { Instructions } from "@components"
import { getEvaluationFlowList } from "@server"
import { EvaluationFlowTable } from "./components"

const EvaluationFlowListPage = async () => {
  const EvaluationFlowData = await getEvaluationFlowList()
  return (
    <div className="mb-12 space-y-6">
      <EvaluationFlowTable data={EvaluationFlowData} />
      <Instructions
        title="توضيحات حول الخدمة"
        description="تتيح هذه الخدمة للموظف امكانية الإطلاع على قائمة طلبات متابعة الأداء."
      />
    </div>
  )
}

export default EvaluationFlowListPage
