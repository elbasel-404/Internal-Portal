import { Instructions, RequestGeneralData } from "@components"
import { getTrainingRequests } from "@server"
import { TrainingTable } from "./components"

const TrainingListPage = async () => {
  const trainingData = await getTrainingRequests()
  return (
    <div className="space-y-4 mb-12">
      <RequestGeneralData model="training_request" />

      <TrainingTable data={trainingData} />
      <Instructions
        title="توضيحات حول الخدمة"
        description="تتيح هذه الخدمة للموظف إمكانية عرض وتقديم طلبات الدورات التدريبية."
      />
    </div>
  )
}

export default TrainingListPage
