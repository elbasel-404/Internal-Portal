import { InfoGrid } from '@components';
import type { GeneralInfo } from '@types';

interface AttendanceDataProps {
  data: GeneralInfo[];
}

export const AttendanceData = ({ data }: AttendanceDataProps) => {
  return <InfoGrid info={data} className='lg:grid-cols-3' />;
};
