"use client"

import { useIntersectionObserver } from "@hooks"
import { useEffect, useState } from "react"
import { NewsSection } from "../components"
import { defaultNewsTabs } from "@lib"
import { getAdsNewsList, getFamilyNewsList, getNewsListRequests } from "@server"
import { getUser } from "@db/actions"
import { AdsListRequst, NewsFamily, NewsListRequest, NewsTab } from "@types"

const NewsSlot = () => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [news, setNews] = useState<NewsListRequest[]>([])
  const [ads, setAds] = useState<AdsListRequst[]>([])
  const [familyNews, setFamilyNews] = useState<NewsFamily[]>([])
  const [tabs, setTabs] = useState<NewsTab[]>([])

  const { isIntersecting, ref } = useIntersectionObserver({
    // TODO: reload tabs on change
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onChange: (state) => {},
  })

  const loadTabs = async () => {
    const userId = parseInt(localStorage.getItem("userId") ?? "0")
    if (userId) {
      const user = await getUser(userId)
      const activeNewsTabsKeys = user.activeNewsTabsKeys
      const tabs = defaultNewsTabs.filter((i) =>
        activeNewsTabsKeys.includes(i.key),
      )
      setTabs(tabs)
    }
  }

  const loadNews = async () => {
    setTimeout(async () => {
      const ads = await getAdsNewsList()
      const news = await getNewsListRequests()
      const familyNews = await getFamilyNewsList()
      // const newsData = await getAdsNewsList()
      setNews(news)
      setAds(ads)
      setFamilyNews(familyNews)
      setIsLoaded(true)
    }, 0)
  }

  useEffect(() => {
    if (isIntersecting && !isLoaded) {
      loadNews()
      loadTabs()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isIntersecting])

  // useEffect(() => {
  //   console.log({ isIntersecting })
  // }, [isIntersecting])

  if (tabs.length === 0) return null
  return (
    <div ref={ref}>
      <NewsSection news={news} ads={ads} familyNews={familyNews} tabs={tabs} />
    </div>
  )
}
export default NewsSlot
