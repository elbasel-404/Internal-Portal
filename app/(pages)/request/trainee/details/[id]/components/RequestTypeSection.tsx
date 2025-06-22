"use client"

import { NewsTabsKey, type Row } from "@types"
import { useEffect, useState } from "react"
import { NewsTabs } from "../../../../../home/components/NewsSection/NewsTabs"
import { defaultTraineeTabs } from "../../../../../../lib/defaultTraineeTabs"
import { TraineeTypeContent } from "./TraineeTypeContent"
import { vpnHeaders } from "./config"
import { nationalIdHeaders } from "./config"
import { officeHeaders } from "./config"
import { emailHeaders } from "./config"

// import { NewsHeader } from './NewsHeader';

export const RequestTypeSection = () => {
  const tabs = defaultTraineeTabs
  const firstTab = tabs[0]
  const [activeTab, setActiveTab] = useState<NewsTabsKey>(firstTab?.key)
  useEffect(() => {
    const isActiveTabPresent = tabs.find((t) => {
      return t.key === activeTab
    })
    if (isActiveTabPresent) return
    setActiveTab(tabs[0]?.key)
  }, [tabs, activeTab])
  // Use Row type instead of NewsTab for compatibility with TraineeTypeContent
  const ads: Row[] = []
  const renderContent = () => {
    switch (activeTab) {
      case "vpn":
        return (
          <TraineeTypeContent
            title="طلب حساب(vpn)"
            data={ads}
            tableHeaders={vpnHeaders}
            modalname="VpnAcountModal"
          />
        )
      case "nationalId":
        return (
          <TraineeTypeContent
            title="طلب البطاقة"
            data={ads}
            tableHeaders={nationalIdHeaders}
            modalname="CardIdAcountModal"
          />
        )
      case "office":
        return (
          <TraineeTypeContent
            title="طلب مكتب"
            data={ads}
            tableHeaders={officeHeaders}
            modalname="OfficeAcountModal"
          />
        )
      case "email":
        return (
          <TraineeTypeContent
            title="طلب بريد الكتروني"
            data={ads}
            tableHeaders={emailHeaders}
            modalname="EmailAcountModal"
          />
        )
      default:
        return
    }
  }

  return (
    <section className="bg-white py-3 space-y-4 mt-6 rounded-lg">
      <NewsTabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
      {renderContent()}
    </section>
  )
}
