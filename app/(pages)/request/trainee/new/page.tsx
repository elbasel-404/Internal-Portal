import { CreateRequestStatus } from "@components"
import { getCreateRequestStatus } from "@server"
import { TraineeForm } from "../components"

const NewTraineePage = async () => {
  const model = "hr.distance.work"
  const requestStatus = await getCreateRequestStatus(model)
  const requestCaption = "انت الان في مرحلة انشاء الطلب"
  return (
    <div className="space-y-4 mb-16">
      <CreateRequestStatus status={requestStatus} caption={requestCaption} />
      <TraineeForm />
    </div>
  )
}

export default NewTraineePage
