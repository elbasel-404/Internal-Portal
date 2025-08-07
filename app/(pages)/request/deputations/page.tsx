import { getDeputationRequests } from "@server"
import { DeputationTable } from "./components"
import { RequestGeneralData } from "@components"

const DeputationListPage = async () => {
  const DeputationData = await getDeputationRequests()
  return (
    <div className="mb-12">
      <RequestGeneralData model="deputation" />

      <DeputationTable data={DeputationData} />
    </div>
  )
}

export default DeputationListPage
