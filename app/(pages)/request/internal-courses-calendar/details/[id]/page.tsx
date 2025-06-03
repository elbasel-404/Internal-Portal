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
  const requestCaption =
    "انت الان في مرحلة انشاء الطلب و بانتظار موافقة المدير المباشر"

  const {
    courseName,
    courseDate,
    duration,
    type,
    trainingCenter,
    city,
    seatsNumber,
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
    { label: "عدد المقاعد", value: seatsNumber },
    { label: "عدد المشتركين", value: subscribersNumber },
    { label: "برنامج الدورة", value: courseProgram },
  ]

  return (
    <>
      <InternalCourseDetailsClient
        trainingButton={displayButton}
        headers={requestHeaders}
        caption={requestCaption}
        status={requestStatus}
        courseId={id}
      />
    </>
  )
}

export default InternalCoursesDetailsPage
