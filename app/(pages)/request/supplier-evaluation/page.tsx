// Removed unused import: Instructions
import { EvaluationTable } from "./components"
import { getSupplierEvaluationRequests } from "@server"


const SupplierEvaluationRequestsListPage = async () => {
  const SupplierEvaluationRequests = await getSupplierEvaluationRequests()

  return (
    <div className="space-y-4 mb-12">
      <EvaluationTable data={SupplierEvaluationRequests} />
    </div>
  )
}

export default SupplierEvaluationRequestsListPage
