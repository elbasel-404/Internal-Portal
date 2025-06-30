import { paths } from "@lib"
// import { getNewsListRequests } from "@server"
import { NewsList } from "../components"

export const revalidate = 8400 // revalidate every 24 hours

const PressFilePage = async () => {
  // const pressFileData = await getNewsListRequests()

  return (
    <>
      <NewsList
        // newsData={pressFileData}
        newsData={[]}
        title="الملف الصحفي"
        path={paths.pressFileDetails.href}
      />
    </>
  )
}

export default PressFilePage
