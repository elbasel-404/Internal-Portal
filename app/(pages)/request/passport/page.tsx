import { getPassportRequests } from "@server"
import { PassportTable } from "./components"
import { RequestGeneralData } from "@components"

const PassportListPage = async () => {
  const passportData = await getPassportRequests()
  return (
    <div className="mb-12">
      <RequestGeneralData model="passport_request" />

      <PassportTable data={passportData} />
    </div>
  )
}

export default PassportListPage
