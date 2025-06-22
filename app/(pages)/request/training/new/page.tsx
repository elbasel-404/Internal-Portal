import { RequestStatus } from "@components"
import { getUser } from "@db/actions"
import { getRequestStatus, getUserId } from "@server"
import { TrainingForm } from "../components"

const NewTrainingPage = async () => {
  const userId = await getUserId()
  if (!userId) return

  const { trainingCourses } = await getUser(userId)
  const requestStatus = await getRequestStatus("", "")
  const requestCaption =
    "انت الان في مرحلة انشاء الطلب و بانتظار موافقة المدير المباشر"
  return (
    <div className="space-y-4 mb-16">
      <RequestStatus status={requestStatus} caption={requestCaption} />
      <TrainingForm trainingCourses={trainingCourses} />
    </div>
  )
}

export default NewTrainingPage
