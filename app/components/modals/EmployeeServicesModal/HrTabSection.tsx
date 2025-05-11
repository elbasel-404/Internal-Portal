import type { MenuItem } from '@types';
import { Tabs } from '@ui';
import { ServicesGrid } from './ServiceGrid';
import { HrTabs } from './config';

interface HrTabsSectionProps {
  activeHrTab: string;
  onTabChange: (filter: string) => void;
  services: MenuItem[];
  favorites: MenuItem[];
  onToggleFavorite: (item: MenuItem) => void;
}

export const HrTabsSection = ({
  activeHrTab,
  onTabChange,
  services,
  favorites,
  onToggleFavorite,
}: HrTabsSectionProps) => {
  const filteredTab = services.filter((service) => service.tag === activeHrTab);
  return (
    <>
      <div className='rounded-lg bg-white border-2 border-primary-opacity p-4 mb-2'>
        <Tabs
          tabs={HrTabs}
          activeTab={activeHrTab}
          onTabChange={onTabChange}
          tabClassName='h-12 w-full text-sm font-bold hover:rounded-lg'
          activeTabClassName='font-bold text-forground text-lg text-primary rounded-lg bg-primary-opacity'
          tabSectionClassName='gap-2 mt-2'
        />
      </div>
      <ServicesGrid
        services={filteredTab}
        favorites={favorites}
        onToggleFavorite={onToggleFavorite}
      />
    </>
  );
};
