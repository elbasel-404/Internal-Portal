import { colors } from '@lib';
import { PieChartElem } from '@ui';

const SurveysPage = () => {
  const surveys = [
    {
      question: 'ما رأيك بتصميم البوابة الداخلية؟',
      percentage: 75,
      status: 'ممتاز',
    },
    {
      question: 'ما رأيك بتصميم البوابة الداخلية؟',
      percentage: 55,
      status: 'جيد',
    },
    {
      question: 'ما رأيك بتصميم البوابة الداخلية؟',
      percentage: 65,
      status: 'جيد جدا',
    },
  ];

  const pieChartData = [
    { stat: 'جيد', percentage: 30, fill: 'var(--color-good)' },
    { stat: 'جيد جدا', percentage: 30, fill: 'var(--color-veryGood)' },
    { stat: 'ممتاز', percentage: 40, fill: 'var(--color-excellent)' },
  ];

  const pieChartConfig = {
    good: {
      label: 'جيد',
      color: colors.light.blue,
    },
    veryGood: {
      label: 'جيد جدا',
      color: colors.light.lightBlue,
    },
    excellent: {
      label: 'ممتاز',
      color: colors.dark.darkBlue,
    },
  };
  return (
    <div className='rounded-xl py-4 w-full bg-white'>
      <div className='p-4 border-b border-light'>
        <h1 className='text-2xl font-bold text-foreground text-right'>
          الإستبيانات
        </h1>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-4 mt-4'>
        {surveys.map((survey, index) => (
          <div
            key={index}
            className='relative bg-cloudGray min-h-80 rounded-2xl flex flex-col justify-center items-center p-4'
          >
            <h2 className='text-primary font-bold text-xl absolute top-10'>
              {survey.question}
            </h2>
            <PieChartElem
              size={7}
              thickness={30}
              percentage={survey.percentage}
              percentageSize='text-xl'
              percentageColor='fill-foreground'
              nameKey='stat'
              dataKey='percentage'
              chartConfig={pieChartConfig}
              chartData={pieChartData}
              label={survey.status}
              labelClassName='fill-primary font-bold text-lg'
              showLabelFirst
              pieChartHeight='250'
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SurveysPage;
