import { NewsSection } from "../components"
import { defaultNewsTabs } from "@lib"
import {
  getAdsNewsList,
  getFamilyNewsList,
  getNewsListRequests,
  getUserId,
} from "@server"
import { getUser } from "@db/actions"

export const revalidate = 8400 // revalidate every 24 hours

const NewsSlot = async () => {
  const userId = await getUserId()
  const ads = await getAdsNewsList({
    limit: 3,
    page: 1,
  })
  const news = await getNewsListRequests({
    limit: 3,
    page: 1,
  })
  const familyNews = await getFamilyNewsList({
    limit: 3,
    page: 1,
  })
  let tabs = defaultNewsTabs
  if (userId) {
    const user = await getUser(userId)
    const activeNewsTabsKeys = user.activeNewsTabsKeys
    tabs = tabs.filter((i) => activeNewsTabsKeys.includes(i.key))
  }

  return (
    <NewsSection news={news} ads={ads} familyNews={familyNews} tabs={tabs} />
  )
}
export default NewsSlot
