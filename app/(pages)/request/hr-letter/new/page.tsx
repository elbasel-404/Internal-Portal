import { CreateRequestStatus } from "@components"
import {
  getCreateRequestStatus,
  getDestinationElement,
  getHrLetterTypes,
} from "@server"
import { HrLetterForm } from "../components"

const NewHrLetterPage = async () => {
  const model = "salary.identification.request"
  const requestStatus = await getCreateRequestStatus(model)
  const destinationElements = await getDestinationElement()
  const hrLetterTypes = await getHrLetterTypes()
  const requestCaption = "انت الان في مرحلة انشاء الطلب"
  return (
    <div className="space-y-4 mb-16">
      <CreateRequestStatus status={requestStatus} caption={requestCaption} />
      <HrLetterForm
        destinationElement={destinationElements}
        hrLetterTypes={hrLetterTypes}
      />
    </div>
  )
}

export default NewHrLetterPage
