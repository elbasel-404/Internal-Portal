import { infoIcons } from '../../components/InfoGrid/config';
import type { GeneralInfoKey } from '@types';

export type IconName = keyof typeof infoIcons;
export type GeneralInfo = {
  id: number;
  key: GeneralInfoKey;
  active: boolean;
  index: number;
  title: string;
  icon: IconName;
  backgroundColor: string;
  count: number;
  link?: string;
  buttonName?: string;
  iconTextColor?: string;
  userId?: number;
};
