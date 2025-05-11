'use client';

import { NewsTabsKey, type NewsTab } from '@types';
import { useEffect, useState } from 'react';
import { NewsCard } from './NewsCard';
import { NewsCarousel } from './NewsCarousel';
import { NewsGrid } from './NewsGrid';
// import { NewsHeader } from './NewsHeader';
import { NewsTabs } from './NewsTabs';

interface NewsSectionProps {
  tabs: NewsTab[];
}

export const NewsSection = ({ tabs }: NewsSectionProps) => {
  const firstTab = tabs[0];
  const [activeTab, setActiveTab] = useState<NewsTabsKey>(firstTab?.key);

  useEffect(() => {
    const isActiveTabPresent = tabs.find((t) => {
      return t.key === activeTab;
    });
    if (isActiveTabPresent) return;
    setActiveTab(tabs[0]?.key);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabs]);

  const newsData = [
    {
      id: 1,
      title: 'نشرة منشآت الربعية - الربيع الثاني',
      date: '2024 يوليو 26',
      description: 'نشرة منشآت الربع الثاني - الربع الثاني',
      image: '/images/news-3.png',
    },
    {
      id: 2,
      title: 'نشرة منشآت الربعية - الربيع الثاني',
      date: '2024 يوليو 26',
      description: 'نشرة منشآت الربع الثاني - الربع الثاني',
      image: '/images/news-2.png',
    },
    {
      id: 3,
      title: 'نشرة منشآت الربعية - الربيع الثاني',
      date: '2024 يوليو 26',
      description: 'نشرة منشآت الربع الثاني - الربع الثاني',
      image: '/images/news-1.png',
    },
  ];

  

  return (
    <section className='bg-white rounded-xl space-y-4'>
      {/* <NewsHeader title='الأخبار و الاعلانات' /> */}
      <NewsTabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === 'pressTab' || tabs.length === 0 ? (
        <>
          <div className='grid grid-cols-1 lg:grid-cols-4 gap-y-4 lg:gap-x-4 px-4'>
            <aside className='bg-white col-span-1 order-2 lg:-order-1'>
              <div className='space-y-4'>
                <NewsCard newsData={newsData} />
              </div>
            </aside>
            <div className='col-span-3'>
              <NewsCarousel newsData={newsData} />
            </div>
          </div>
          <NewsGrid newsData={newsData} />
        </>
      ) : (
        <div className='flex items-center justify-center min-h-96'>
          <p className='text-2xl font-medium'>لا توجد اخبار حالياً</p>
        </div>
      )}
    </section>
  );
};
