import { getEmployeeDepartmentRequests } from "@server"
import { EmployeeDepartment } from "./components"

const EmployeeDepartmentPage = async () => {
  const employeeData = await getEmployeeDepartmentRequests()
  return <EmployeeDepartment employees={employeeData} />
}

export default EmployeeDepartmentPage
