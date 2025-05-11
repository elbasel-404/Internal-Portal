'use client';

import { useLocalStorage } from '@hooks';
import type { IconKey, MenuItem } from '@types';
import { useState } from 'react';
import { MenuItems } from '../../Sidebar/config';
import { FavoriteSection } from './FavoriteSection';
import { HrTabsSection } from './HrTabSection';
import { ServicesGrid } from './ServiceGrid';
import { TabSection } from './TabSection';
import { tabs } from './config';

interface FilterTabsProps {
  menuKey: IconKey;
  favoritesKey: string;
}

export const FilterTabs = ({ menuKey, favoritesKey }: FilterTabsProps) => {
  const menu = MenuItems.find((item) => item.iconKey === menuKey);

  const [activeTab, setActiveTab] = useState<string>('allRequets');
  const [activeHrTab, setActiveHrTab] = useState<string>('hrServices');
  const [services] = useState(menu?.subMenuItems || []);
  const [favorites, setFavorites] = useLocalStorage<MenuItem[]>(
    favoritesKey,
    []
  );

  const handleFavoriteToggle = (item: MenuItem) => {
    const isFavorite = favorites.some((fav) => fav.label === item.label);
    if (isFavorite) {
      setFavorites((prev) => prev.filter((fav) => fav.label !== item.label));
    } else {
      setFavorites((prev) => [...prev, item]);
    }
  };

  const sortedServices = [...services].sort((a, b) => {
    const aIsFavorite = favorites.some((fav) => fav.label === a.label);
    const bIsFavorite = favorites.some((fav) => fav.label === b.label);
    return Number(bIsFavorite) - Number(aIsFavorite);
  });

  return (
    <>
      <FavoriteSection
        favorites={favorites}
        onToggleFavorite={handleFavoriteToggle}
      />
      {menuKey === 'Citizen' && (
        <TabSection
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      )}
      <div className='bg-lightGrayish rounded-br-2xl rounded-bl-2xl p-4 h-3/4 overflow-y-auto app-scrollbar'>
        {activeTab === 'allRequets' ? (
          <ServicesGrid
            services={sortedServices}
            favorites={favorites}
            onToggleFavorite={handleFavoriteToggle}
          />
        ) : activeTab === 'hr' ? (
          <HrTabsSection
            activeHrTab={activeHrTab}
            services={sortedServices}
            onTabChange={setActiveHrTab}
            favorites={favorites}
            onToggleFavorite={handleFavoriteToggle}
          />
        ) : (
          <ServicesGrid
            services={sortedServices.filter(
              (service) => service.tag === activeTab
            )}
            favorites={favorites}
            onToggleFavorite={handleFavoriteToggle}
          />
        )}
      </div>
    </>
  );
};
