import { paths } from "@lib"
import { getFamilyNewsList } from "@server"
import { NewsList } from "../components"

const MonshaatFamilyPage = async () => {
  const monshaatFamilyData = await getFamilyNewsList()
  return (
    <>
      <NewsList
        newsData={monshaatFamilyData}
        title="عائلة منشأت"
        path={paths.monshaatFamilyDetails.href}
      />
    </>
  )
}

export default MonshaatFamilyPage
