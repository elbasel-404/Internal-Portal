import { NewsTabsKey } from '@types';
import { Button } from '@ui';

type Tab = {
  key: NewsTabsKey;
  label: string;
};

type NewsTabsProps = {
  tabs: Tab[];
  activeTab: NewsTabsKey | '';
  onTabChange: (tabId: NewsTabsKey) => void;
};

export const NewsTabs = ({ tabs, activeTab, onTabChange }: NewsTabsProps) => {
  return (
    <div className='px-4'>
      <div className='flex items-center sm:gap-x-12 flex-wrap px-4 rounded-xl bg-cloudGray'>
        {tabs.map((tab) => (
          <Button
            key={tab.key}
            className={`px-4 py-6 text-xl font-medium flex-1 sm:flex-none rounded-lg bg-transparent shadow-none ${
              activeTab === tab.key
                ? 'text-primary border-b-2 border-primary rounded-none'
                : 'text-foreground'
            }`}
            onClick={() => onTabChange(tab.key)}
          >
            {tab.label}
          </Button>
        ))}
      </div>
    </div>
  );
};
