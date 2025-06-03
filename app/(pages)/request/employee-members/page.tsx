import { getEmployeeMembersRequests } from "@server"
import { EmployeeMembersTable } from "./components"

const EmployeeMembersListPage = async () => {
  const employeeMembersData = await getEmployeeMembersRequests()
  return (
    <div className="space-y-4 mb-12">
      <EmployeeMembersTable data={employeeMembersData} />
    </div>
  )
}

export default EmployeeMembersListPage
