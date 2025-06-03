// Update TabType to only accept "myRequests" | "approvalRequests" for filter

import type { TabType } from "@types"

interface TabsProps {
  tabs: TabType[]
  activeTab: TabType["filter"]
  onTabChange: (filter: TabType["filter"]) => void
  tabClassName?: string
  activeTabClassName?: string
  tabSectionClassName?: string
}

export const Tabs = ({
  tabs,
  activeTab,
  onTabChange,
  tabClassName,
  activeTabClassName,
  tabSectionClassName,
}: TabsProps) => (
  <div className={`flex ${tabSectionClassName}`}>
    {tabs.map((tab) => (
      <button
        key={tab.filter}
        className={`${tabClassName}  ${
          activeTab === tab.filter
            ? ` ${activeTabClassName}`
            : "hover:bg-primary-opacity hover:text-primary"
        }`}
        onClick={() => onTabChange(tab.filter)}
      >
        {tab.icon && (
          <span className="bg-primary-opacity rounded-xl p-3">{tab.icon}</span>
        )}

        {tab.name}
      </button>
    ))}
  </div>
)
