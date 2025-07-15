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

  const loadAds = () => {
    if (ads.length > 0) return
    getAdsNewsList({
      limit: 3,
      page: 1,
    }).then((ads) => {
      setAds(ads)
    })
  }

  const loadNews = () => {
    if (news.length > 0) return
    getNewsListRequests({
      limit: 3,
      page: 1,
    }).then((news) => {
      setNews(news)
    })
  }

  const loadFamilyNews = () => {
    if (familyNews.length > 0) return
    getFamilyNewsList({
      limit: 3,
      page: 1,
    }).then((familyNews) => {
      setFamilyNews(familyNews)
    })
  }

  const init = async () => {
    setLoading(true)
    await loadTabs()
    setLoading(false)
    // setLoaded(true)
  }

  useEffect(() => {
    if (!isIntersectingOuter) return
    init()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isIntersectingOuter])

  useEffect(() => {
    if (!isIntersectingInner) return
    loadTabs()
  }, [isIntersectingInner])

  useEffect(() => {
    if (tabs.length === 0) return

    loadNews();
    loadAds();
    loadFamilyNews();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabs])

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
