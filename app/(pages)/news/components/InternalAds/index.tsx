import { NewsHeader } from "@components"
import { paths } from "@lib"
import { NewsSection } from "../../../home/components"
import { getAdsNewsList } from "@server"

export const revalidate = 86400 // revalidate every 24 hours

export const InternalAds = async () => {
  const newsData = await getAdsNewsList({
    limit: 1,
    page: 1,
  })
  return (
    <div className="bg-white rounded-xl">
      <NewsHeader title="إعلانات داخلية" url={paths.internalAds.href} />
      <NewsSection ads={newsData} familyNews={[]} news={[]} tabs={[]} />
    </div>
  )
}
