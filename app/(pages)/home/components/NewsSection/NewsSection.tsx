"use client"

import {
  NewsTabsKey,
  type NewsTab,
  type AdsListRequst,
  type NewsFamily,
  type NewsListRequest,
} from "@types"
import { useEffect, useState } from "react"
// import { NewsHeader } from './NewsHeader';
import { NewsTabs } from "./NewsTabs"
import { NewsContent } from "./NewsContent"
interface NewsSectionProps {
  tabs: NewsTab[]
  ads: AdsListRequst[]
  familyNews: NewsFamily[]
  news: NewsListRequest[]
}

export const NewsSection = ({
  tabs,
  news,
  ads,
  familyNews,
}: NewsSectionProps) => {
  const firstTab = tabs[0]
  const [activeTab, setActiveTab] = useState<NewsTabsKey>(firstTab?.key)
  useEffect(() => {
    const isActiveTabPresent = tabs.find((t) => {
      return t.key === activeTab
    })
    if (isActiveTabPresent) return
    setActiveTab(tabs[0]?.key)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabs])

  const renderContent = () => {
    if (tabs.length === 0) {
      return null
    }
    switch (activeTab) {
      case "internalTab":
        return <NewsContent data={ads} />
      case "newsTab":
        return <NewsContent data={news} />
      case "monshaatFamilyTab":
        return <NewsContent data={familyNews} />
      default:
        return (
          <div className="flex items-center justify-center min-h-96">
            <p className="text-2xl font-medium">لا توجد اخبار حالياً</p>
          </div>
        )
    }
  }

  return (
    <section className="bg-white pt-3 space-y-4">
      {/* <NewsHeader title='الأخبار و الاعلانات' /> */}
      <NewsTabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
      {renderContent()}
    </section>
  )
}
