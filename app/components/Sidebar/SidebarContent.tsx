import { Dispatch, SetStateAction } from 'react';
import { AppSection } from './AppSection';
import { SidebarHeader } from './SidebarHeader';
import { SidebarMenus } from './SidebarMenus';

interface SideBarContentProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const SidebarContent = ({ isOpen, setIsOpen }: SideBarContentProps) => {
  return (
    <>
      <SidebarHeader isOpen={isOpen} setIsOpen={setIsOpen} />
      <SidebarMenus isOpen={isOpen} />
      <AppSection isOpen={isOpen} />
    </>
  );
};
