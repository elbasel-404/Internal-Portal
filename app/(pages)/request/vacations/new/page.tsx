import { CreateRequestStatus } from "@components"
import { getCreateRequestStatus, getVacationElements } from "@server"
import { VacationForm } from "../components"

const NewVacationPage = async () => {
  const model = "hr.holidays"
  const requestStatus = await getCreateRequestStatus(model)
  const vacationElements = await getVacationElements()
  const requestCaption = "انت الان في مرحلة انشاء الطلب"
  return (
    <div className="space-y-4 mb-16">
      <CreateRequestStatus status={requestStatus} caption={requestCaption} />
      <VacationForm vacationElements={vacationElements} />
    </div>
  )
}

export default NewVacationPage
