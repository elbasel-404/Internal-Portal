import type { TabType } from "@types"
import { Tabs } from "@ui"

interface TabSectionProps {
  tabs: TabType[]
  activeTab: TabType["filter"]
  onTabChange: (filter: TabType["filter"]) => void
}

export const TabSection = ({
  tabs,
  activeTab,
  onTabChange,
}: TabSectionProps) => (
  <Tabs
    tabs={tabs}
    activeTab={activeTab}
    onTabChange={onTabChange}
    tabClassName="h-12 w-full text-sm hover:rounded-tl-lg hover:rounded-tr-lg"
    activeTabClassName="font-semibold rounded-tl-lg rounded-tr-lg bg-lightGrayish"
    tabSectionClassName="gap-0 mt-2"
  />
)
