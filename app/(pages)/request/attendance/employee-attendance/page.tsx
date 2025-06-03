import { getEmployeeAttendanceRequests } from "@server"
import { Fragment } from "react"
import { EmployeeAttendanceTable } from "../components"

const EmployeeAttendancePage = async () => {
  const getEmployeeAttendanceData = await getEmployeeAttendanceRequests()
  return (
    <Fragment>
      <EmployeeAttendanceTable data={getEmployeeAttendanceData} />
    </Fragment>
  )
}

export default EmployeeAttendancePage
