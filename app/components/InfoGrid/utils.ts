import { ReactNode } from 'react';
import { infoIcons } from './config';

export const getIconNode = (iconName: keyof typeof infoIcons) => {
  const iconFC = infoIcons[iconName] as unknown as ReactNode;
  return iconFC;
};
