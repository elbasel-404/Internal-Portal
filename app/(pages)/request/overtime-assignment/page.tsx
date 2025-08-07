import { getOvertimeAssignmentRequests } from "@server"
import { OvertimeAssignmentTable } from "./components"
import { RequestGeneralData } from "@components"

const OvertimeAssignmentListPage = async () => {
  const overtimeAssignmentData = await getOvertimeAssignmentRequests()
  return (
    <div className="mb-12">
      <RequestGeneralData model="overtime_assignment" />
      <OvertimeAssignmentTable data={overtimeAssignmentData} />
    </div>
  )
}

export default OvertimeAssignmentListPage
