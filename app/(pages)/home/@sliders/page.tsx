import {
  getNewsSlides,
  getEmployeeDepartmentRequests,
  getSession,
} from "@server"
import { HomePageSliders } from "../components"

const SlidersSlot = async () => {
  const session = await getSession()
  if (!session) {
    return null
  }

  const relatedUsers = await getEmployeeDepartmentRequests()
  const newsSlides = await getNewsSlides()
  return (
    <HomePageSliders
      key="sliders"
      slides={newsSlides}
      relatedUsers={relatedUsers}
    />
  )
}

export default SlidersSlot
