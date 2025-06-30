import { NewsSection } from "../components"
import { defaultNewsTabs } from "@lib"
import {
  getAdsNewsList,
  getFamilyNewsList,
  getNewsListRequests,
  // getUserId,
} from "@server"
// import { getUser } from "@db/actions"

const NewsSlot = async () => {
  // const userId = await getUserId()
  const ads = await getAdsNewsList({
    limit: 1,
    page: 1,
  })
  const news = await getNewsListRequests()
  const familyNews = await getFamilyNewsList()
  // let tabs = defaultNewsTabs
  // if (userId) {
  //   const user = await getUser(userId)
  //   const activeNewsTabsKeys = user.activeNewsTabsKeys
  //   tabs = tabs.filter((i) => activeNewsTabsKeys.includes(i.key))
  // }

  return (
    // <NewsSection news={news} ads={ads} familyNews={familyNews} tabs={tabs} />
    <NewsSection
      news={news}
      ads={ads}
      familyNews={familyNews}
      tabs={defaultNewsTabs}
    />
  )
}
export default NewsSlot
