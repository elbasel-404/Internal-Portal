// import { Instructions } from "@components"
import { getContractorRequests } from "@server"
import { ContractorTable } from "./components"

const ContractorListPage = async () => {
  const ContractorData = await getContractorRequests()
  return (
    <div className="space-y-4 mb-12">
      <ContractorTable data={ContractorData} />
      {/* <Instructions
        title="توضيحات حول الخدمة"
        description="تتيح هذه الخدمة للموظف إمكانية تقديم طلب العهدة، يتم تعبئة الطلب بالبيانات الأساسية ويجب على الموظف التأكد من معطيات طلب العهدة."
      /> */}
    </div>
  )
}

export default ContractorListPage
