import { Instructions } from "@components"
import { RemoteWorkTable } from "./components"
import { getRemoteWorkRequests } from "@server"

const RemoteWorkListPage = async () => {
  const remoteWorkData = await getRemoteWorkRequests()
  return (
    <div className="space-y-4 mb-12">
      <RemoteWorkTable data={remoteWorkData} />
      <Instructions
        title="توضيحات حول الخدمة"
        description="تحرص “الهيئة العامة للمنشآت الصغيرة والمتوسطة” على تهيئة بيئة عمل مثالية تلائم احتياجات الموظفين وتزيد من رضاهم الوظيفي وتحافظ على الإنجاز وسير العمل من خلال توفير مرونة أكبر في موقع العمل والسماح للموظفين بالعمل عن بعد بشكل مؤقت."
      />
    </div>
  )
}

export default RemoteWorkListPage
