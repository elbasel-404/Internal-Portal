import { getInternalCoursesDetails, getRequestStatus } from "@server"
import { RequestHeader } from "@types"
import { InternalCourseDetailsClient } from "../../components"

type Params = Promise<{ id: string }>

interface InternalCoursesDetailsPageProps {
  params: Params
}

const InternalCoursesDetailsPage = async ({
  params,
}: InternalCoursesDetailsPageProps) => {
  const { id } = await params
  const model = "hr.training"
  const requestStatus = await getRequestStatus(id, model)

  const {
    courseName,
    courseDate,
    duration,
    type,
    trainingCenter,
    city,
    subscribersNumber,
    courseProgram,
    displayButton,
  } = (await getInternalCoursesDetails(id)) || {}

  const requestHeaders: RequestHeader[] = [
    { label: "مسمى الدورة", value: courseName },
    { label: "تاريخ الدورة", value: courseDate },
    { label: "المدة", value: duration },
    { label: "النوع", value: type },
    { label: "مركز التدريب", value: trainingCenter },
    { label: "المدينة", value: city },
    { label: "عدد المشتركين", value: subscribersNumber },
    { label: "برنامج الدورة", value: courseProgram },
  ]

  return (
    <>
      <InternalCourseDetailsClient
        trainingButton={displayButton}
        headers={requestHeaders}
        status={requestStatus}
        courseId={id}
      />
    </>
  )
}

export default InternalCoursesDetailsPage
