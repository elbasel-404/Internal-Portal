import { Instructions, RequestGeneralData } from "@components"
import { getMedicalInsuranceRequests } from "@server"
import { MedicalTable } from "./components"

const MedicalInsuranceListPage = async () => {
  const medicalInsuranceData = await getMedicalInsuranceRequests()
  return (
    <div className="space-y-4 mb-12">
      <RequestGeneralData model="medical_insurance" />

      <MedicalTable data={medicalInsuranceData} />
      <Instructions
        title="توضيحات حول الخدمة"
        description="تتيح هذه الخدمة للموظف إمكانية تقديم طلب تأمين طبي، يتم تعبئة الطلب بالبيانات الأساسية ويجب على الموظف التأكد من معطيات طلب التأمين الطبي."
      />
    </div>
  )
}

export default MedicalInsuranceListPage
