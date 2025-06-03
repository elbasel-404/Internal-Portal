import { getAttendanceGeneralInfo, getAttendanceListRequests } from "@server"
import { Fragment } from "react"
import { AttendanceData, AttendanceTable } from "../components"

const AttendanceListPage = async () => {
  const getAttendanceListData = await getAttendanceListRequests()
  const getAttendanceData = await getAttendanceGeneralInfo()
  return (
    <Fragment>
      <AttendanceData data={getAttendanceData} />
      <AttendanceTable data={getAttendanceListData} />
    </Fragment>
  )
}

export default AttendanceListPage
