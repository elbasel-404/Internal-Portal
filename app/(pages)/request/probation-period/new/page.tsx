import { RequestStatus } from "@components"
import {
  getProbationPeriodEmployees,
  getProbationPeriodFields,
  getRequestStatus,
} from "@server"
import { ProbationPeriodForm } from "../components"

const NewProbationPeriodPage = async () => {
  const requestStatus = await getRequestStatus("", "")
  const probationPeriodEmployees = await getProbationPeriodEmployees()
  const probationPeriodQuestions = await getProbationPeriodFields("questions")
  const probationPeriodAnswers = await getProbationPeriodFields("answers")
  const probationPeriodRecommendation =
    await getProbationPeriodFields("recommendation")
  const requestCaption =
    "انت الان في مرحلة انشاء الطلب و بانتظار موافقة المدير المباشر"

  return (
    <div className="space-y-4 mb-16">
      <RequestStatus status={requestStatus} caption={requestCaption} />
      <ProbationPeriodForm
        probationPeriodEmployees={probationPeriodEmployees}
        probationPeriodQuestions={probationPeriodQuestions}
        probationPeriodAnswers={probationPeriodAnswers}
        probationPeriodRecommendation={probationPeriodRecommendation}
      />
    </div>
  )
}

export default NewProbationPeriodPage
