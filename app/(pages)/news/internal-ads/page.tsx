import { paths } from "@lib"
import { getAdsNewsList } from "@server"
import { NewsList } from "../components"

export const revalidate = 8400 // revalidate every 24 hours

const InternalAdsPage = async () => {
  const internalAdsData = await getAdsNewsList({
    limit: 1,
    page: 1,
  })
  return (
    <>
      <NewsList
        newsData={internalAdsData}
        title="إعلانات داخلية"
        path={paths.internalAdsDetails.href}
      />
    </>
  )
}

export default InternalAdsPage
