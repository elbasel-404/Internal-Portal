import { MyApprovals, MyRequests } from "../components/Requests"
import { getMyApprovals, getMyRequests } from "./server"

interface RequestsTableSlotProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

const RequestsTableSlot = async ({ searchParams }: RequestsTableSlotProps) => {
  const params = await searchParams
  const tab = params?.tab as string | undefined
  const isMyRequests = tab === "my-requests"
  const isMyApprovals = tab === "my-approvals"
  const myRequests = await getMyRequests({
    limit: 10,
  })
  const myApprovals = await getMyApprovals()

  if (isMyApprovals) {
    return <MyApprovals key="approvals-table" requests={myApprovals} />
  }

  if (isMyRequests) {
    return <MyRequests key="requests-table" requests={myRequests} />
  }

  return <MyApprovals key="approvals-table" requests={myApprovals} />
}
export default RequestsTableSlot
