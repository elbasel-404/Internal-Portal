// import { CreateRequestStatus } from "@components"
// import { getCreateRequestStatus } from "@server"
import { TicketForm } from "../components"

const NewTicketPage = async () => {
  // const requestStatus = await getCreateRequestStatus("helpdesk.ticket")
  // const requestCaption =
  //   "انت الان في مرحلة انشاء الطلب و بانتظار موافقة المدير المباشر"
  return (
    <div className="space-y-4 mb-16">
      {/* <CreateRequestStatus status={requestStatus} caption={requestCaption} /> */}
      <TicketForm />
    </div>
  )
}

export default NewTicketPage
