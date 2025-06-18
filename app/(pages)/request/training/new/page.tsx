import { RequestStatus } from "@components"
import { getUser } from "@db/actions"
import { getRequestStatus, getSubstituteEmployees, getTrainingFields, getUserId } from "@server"
import { TrainingForm } from "../components"

const NewTrainingPage = async () => {
  const userId = await getUserId()
  if (!userId) return

  const { trainingCourses } = await getUser(userId)
  const trainingCenterFields = await getTrainingFields("training_center_id")
  const trainingTravelDaysSettingsFields = await getTrainingFields("travel_days_setting")
  const trainingTypeFields = await getTrainingFields("training_type_id")
  const trainingCountryFields = await getTrainingFields("country_id")
  const trainingCityFields = await getTrainingFields("city_id")
  const requestStatus = await getRequestStatus()
  const substituteEmployees = await getSubstituteEmployees()

  const requestCaption =
    "انت الان في مرحلة انشاء الطلب و بانتظار موافقة المدير المباشر"
  return (
    <div className="space-y-4 mb-16">
      <RequestStatus status={requestStatus} caption={requestCaption} />
      <TrainingForm
        trainingCourses={trainingCourses}
        trainingCenterFields={trainingCenterFields}
        trainingTravelDaysSettingsFields={trainingTravelDaysSettingsFields}
        trainingTypeFields={trainingTypeFields}
        trainingCountryFields={trainingCountryFields}
        trainingCityFields={trainingCityFields}
        substituteEmployees={substituteEmployees}
      />
    </div>
  )
}

export default NewTrainingPage
