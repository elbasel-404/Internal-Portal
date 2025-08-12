import { getEmployeeMembersRequests } from "@server"
import { EmployeeMembersTable } from "./components"
import { RequestGeneralData } from "@components"

const EmployeeMembersListPage = async () => {
  const employeeMembersData = await getEmployeeMembersRequests()
  return (
    <div className="space-y-4 mb-12">
      <RequestGeneralData model="employee_members" />

      <EmployeeMembersTable data={employeeMembersData} />
    </div>
  )
}

export default EmployeeMembersListPage
