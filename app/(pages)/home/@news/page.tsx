"use client"

import { NewsSection } from "../components"
import { defaultNewsTabs } from "@lib"
import {
  getAdsNewsList,
  getFamilyNewsList,
  getNewsListRequests,
  getUserId,
} from "@server"
import { getUser } from "@db/actions"
import { useEffect, useState } from "react"
import { AdsListRequst, NewsFamily, NewsListRequest, NewsTab } from "@types"
import { useIntersectionObserver } from "usehooks-ts"
import { Loader } from "@components"

const NewsSlot = () => {
  const [loading, setLoading] = useState(false)
  const [ads, setAds] = useState<AdsListRequst[]>([])
  const [news, setNews] = useState<NewsListRequest[]>([])
  const [familyNews, setFamilyNews] = useState<NewsFamily[]>([])
  const [tabs, setTabs] = useState<NewsTab[]>([])
  const [loaded, setLoaded] = useState(false)

  const { isIntersecting: isIntersectingOuter, ref: refOuter } =
    useIntersectionObserver({
      threshold: 0.5,
      freezeOnceVisible: true,
    })

  const { isIntersecting: isIntersectingInner, ref: refInner } =
    useIntersectionObserver({
      threshold: 0.5,
      freezeOnceVisible: false,
    })

  const loadTabs = async () => {
    const userId = await getUserId()
    if (userId) {
      const user = await getUser(userId)
      const activeNewsTabsKeys = user.activeNewsTabsKeys
      const tabs = defaultNewsTabs.filter((i) =>
        activeNewsTabsKeys.includes(i.key),
      )
      setTabs(tabs)
    }
  }

  const init = async () => {
    loadTabs()
    setLoading(true)
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
    setAds(ads)
    setNews(news)
    setFamilyNews(familyNews)
    setLoading(false)
    setLoaded(true)
  }

  useEffect(() => {
    if (loaded) return
    if (!isIntersectingOuter) return
    init()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isIntersectingOuter])

  useEffect(() => {
    if (!loaded) return
    if (!isIntersectingInner) return
    loadTabs()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isIntersectingInner])

  // if (loading) return <Loader />

  return (
    <>
      <div
        ref={refInner}
        className="h-10 w-full bg-black opacity-0 absolute pointer-events-none z-0"
      ></div>
      {loading && <Loader />}
      {!loading && (
        <div ref={refOuter}>
          <NewsSection
            news={news}
            ads={ads}
            familyNews={familyNews}
            tabs={tabs}
          />
        </div>
      )}
    </>
  )
}
export default NewsSlot
