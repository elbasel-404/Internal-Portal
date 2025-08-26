import { ApprovalRequests } from "../components"
import { getApprovalRequests } from "./server"

const RequestsTableSlot = async () => {
  // TODO: make requests table a server component and fetch the data there instead
  const requests = await getApprovalRequests({
    limit: 10,
  })

  return <ApprovalRequests key="requests-table" requests={requests} />
}
export default RequestsTableSlot
