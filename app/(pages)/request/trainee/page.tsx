import { TraineeTable } from "./components"
import { getTraineeRequests } from "@server"

const RemoteWorkListPage = async () => {
  const traineeList = await getTraineeRequests()
  return (
    <div className="space-y-4 mb-12">
      <TraineeTable data={traineeList} />
    </div>
  )
}

export default RemoteWorkListPage
