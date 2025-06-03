import { Instructions } from "@components"
import { getJobApplicationsRequests } from "@server"
import { JobApplicationsTable } from "./components"

const JobApplicationsListPage = async () => {
  const jobApplicationsData = await getJobApplicationsRequests()
  return (
    <div className="space-y-4 mb-12">
      <JobApplicationsTable data={jobApplicationsData} />
      <Instructions
        title="توضيحات حول الخدمة"
        description="تتيح هذه الخدمة للموظف إمكانية الإطلاع على قائمة الطلبات التوظيفية."
      />
    </div>
  )
}

export default JobApplicationsListPage
