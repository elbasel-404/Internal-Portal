"use client"
import { getAttendanceListRequests } from "@server"
import { Fragment, useEffect, useState } from "react"
import { AttendanceTable } from "../components"
import { AttendanceListRequest } from "@types"
import { RequestGeneralData } from "@components"

const AttendanceListPage = () => {
  const [list, setList] = useState<AttendanceListRequest[]>([])
  const [loading, setLoading] = useState(true)

  const currentDate = new Date().toISOString().split("T")[0]
  const [form, setForm] = useState({
    start: currentDate,
    end: currentDate,
    month: "",
  })
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const listData = await getAttendanceListRequests({
        start: form.start,
        end: form.end,
        month: form.month,
      })
      setList(listData)
      setLoading(false)
    }
    fetchData()
  }, [form.start, form.end, form.month])

  // useEffect(() => {
  //   const fetchGeneralData = async () => {
  //     const generalData = await getAttendanceGeneralInfo()
  //     setData(generalData)
  //   }
  //   fetchGeneralData()
  // }, [])
  return (
    <Fragment>
      {/* <AttendanceData data={data} /> */}
      {/* <RequestGeneralData model="change_bank_account" /> */}

      <AttendanceTable
        form={form}
        setForm={setForm}
        data={list}
        loading={loading}
      />
    </Fragment>
  )
}

export default AttendanceListPage
