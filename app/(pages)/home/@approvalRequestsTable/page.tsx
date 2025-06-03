import { getApprovalRequests } from "@server"
import { ApprovalRequestsTable } from "../components"

const RequestsTableSlot = async () => {
  // TODO: make requests table a server component and fetch the data there instead
  const requests = await getApprovalRequests()
  return <ApprovalRequestsTable key="requests-table" requests={requests} />
}
export default RequestsTableSlot
