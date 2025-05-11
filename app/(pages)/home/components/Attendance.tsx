import {
  ArrowDownIcon,
  ArrowUpIcon,
  CircleCheckIcon,
  FingerScanIcon,
} from '@icons';
import { colors } from '@lib';
import { AreaChartGrad, Button } from '@ui';
import { PieStat } from './PieChartStatus';

// TODO: Move data to an api call, and add props to the component
export const Attendance = () => {
  const primaryColor = colors.light.primary;
  const lightColor = colors.light.lightSlate;

  // TODO: use colors from the theme
  const pieChartData = [
    { stat: 'متواجد', percentage: 30, fill: 'var(--color-available)' },
    { stat: 'غير متواجد', percentage: 70, fill: 'var(--color-notِAvailable)' },
  ];

  // TODO: move this to ./config.ts
  const pieChartConfig = {
    available: {
      label: 'متواجد',
      color: primaryColor,
    },
    notِAvailable: {
      label: 'غير متواجد',
      color: lightColor,
    },
  };

  // TODO: Move this to an api call
  const areaChartData = [
    { month: 'January', attendance: 0 },
    { month: 'February', attendance: 240 },
    { month: 'March', attendance: 100 },
    { month: 'April', attendance: 73 },
    { month: 'May', attendance: 180 },
    { month: 'June', attendance: 120 },
  ];

  // TODO: Move to ./config.ts
  const areaChartConfig = {
    attendance: {
      label: 'Attendance',
      color: primaryColor,
    },
  };

  return (
    <div className='flex flex-col bg-white text-right w-full'>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 p-4'>
        <div className=' '>
          {/* Weekly/Monthly Tabs */}
          <div className='flex justify-around mb-4 gap-3'>
            <Button
              variant='outline'
              className='rounded-full shadow-none bg-white text-lg w-full text-foreground border-2 border-[#007C9E24] hover:bg-primary-opacity hover:border-none h-12'
            >
              الشهري
            </Button>
            <Button
              variant='outline'
              className='rounded-full shadow-none bg-white border-2 w-full text-lg border-[#007C9E24] hover:bg-primary-opacity hover:border-none text-foreground h-12'
            >
              الأسبوعي
            </Button>
          </div>

          {/* Percentages */}
          <div className='flex gap-8 justify-center mt-4 mb-8 text-primary font-bold text-lg'>
            <div className='flex items-center gap-2'>
              <span>% 24.8</span>
              <span className='bg-oceanBlue-opacity bg-opacity-10 py-[5px] px-1.5 rounded-full'>
                <ArrowDownIcon className='fill-primary' />
              </span>
            </div>
            <div className='flex items-center gap-2'>
              <span>% 75.2</span>
              <span className='bg-oceanBlue-opacity bg-opacity-10 py-[5px] px-1.5 rounded-full'>
                <ArrowUpIcon />
              </span>
            </div>
          </div>

          {/* Line Chart */}
          <div className='mr-8'>
            <AreaChartGrad
              chartData={areaChartData}
              chartConfig={areaChartConfig}
            />
          </div>
        </div>

        <div className='mt-5 space-y-6'>
          {/* Entry and Exit Times */}
          <h3 className='text-foreground font-medium text-xl mb-4 leading-5'>
            بيانات الحضور والانصراف
          </h3>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
            <div className='bg-cloudGray p-4 w-full rounded-base flex items-start gap-3 text-start flex-wrap'>
              <div className='bg-white p-4 rounded-lg'>
                <FingerScanIcon />
              </div>
              <div className='flex flex-col'>
                <span className='text-foreground font-semibold text-lg'>
                  الدخول
                </span>
                <span className='text-primary text-2xl'>06:20:27PM</span>
              </div>
            </div>
            <div className='bg-cloudGray p-4 w-full rounded-base flex items-start gap-3 text-start flex-wrap'>
              <div className='bg-white p-4 rounded-lg'>
                <FingerScanIcon />
              </div>
              <div className='flex flex-col'>
                <span className='text-foreground font-semibold text-lg'>
                  الخروج
                </span>
                <span className='text-primary text-2xl'>06:20:27PM</span>
              </div>
            </div>
          </div>

          {/* Employee Status */}
          <div className='bg-cloudGray p-4 rounded-base text-start flex gap-2.5'>
            <span className='text-foreground font-bold text-lg'>
              حالة الموظف:
            </span>
            <div className='flex items-center gap-2'>
              <CircleCheckIcon />
              <span className='font-normal text-foreground text-lg'>
                على رأس العمل
              </span>
            </div>
          </div>

          {/* Attendance Rates */}
          {/* TODO:move this to a seperate component */}
          <div className='flex flex-col lg:flex-row gap-4 justify-between items-center mb-6'>
            {[
              'معدل التواجد',
              'معدل الحضور',
              'المتبقى على استكمال ساعات عمل 8',
            ].map((label, index) => (
              <PieStat
                key={index}
                label={label}
                percentage={75}
                time='02:00H'
                pieData={pieChartData}
                pieConfig={pieChartConfig}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
