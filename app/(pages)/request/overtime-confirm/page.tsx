import { getOvertimeConfirmRequests } from "@server"
import { OvertimeConfirmTable } from "./components"
import { RequestGeneralData } from "@components"

const OvertimeConfirmListPage = async () => {
  const overtimeConfirmData = await getOvertimeConfirmRequests()
  return (
    <div className="mb-12">
      <RequestGeneralData model="overtime_request" />
      <OvertimeConfirmTable data={overtimeConfirmData} />
    </div>
  )
}

export default OvertimeConfirmListPage
