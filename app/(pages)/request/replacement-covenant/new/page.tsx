import { CreateRequestStatus } from "@components"
import { getUser } from "@db/actions"
import { getCreateRequestStatus, getUserId } from "@server"
import { ReplacementCovenantForm } from "../components"

export const dynamic = "force-dynamic"

const NewReplacementCovenantPage = async () => {
  const userId = await getUserId()
  if (!userId) return

  const { convenantData } = await getUser(userId)
  const requestStatus = await getCreateRequestStatus("manage.financial.custody")
  const requestCaption =
    "انت الان في مرحلة انشاء الطلب و بانتظار موافقة المدير المباشر"
  return (
    <div className="space-y-4 mb-16">
      <CreateRequestStatus status={requestStatus} caption={requestCaption} />
      <ReplacementCovenantForm data={convenantData} />
    </div>
  )
}

export default NewReplacementCovenantPage
