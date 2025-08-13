import { getPassportRequests } from "@server"
import { PassportTable } from "./components"

const PassportListPage = async () => {
  const passportData = await getPassportRequests()
  return (
    <div className="mb-12">
      <PassportTable data={passportData} />
    </div>
  )
}

export default PassportListPage
