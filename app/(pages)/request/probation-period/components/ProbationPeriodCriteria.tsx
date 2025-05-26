import { cn } from '@utils';

export const ProbationPeriodCriteria = () => {
  const data = [
    { label: 'سلوكيات العمل', value: 'يفى بالتوقعات' },
    { label: 'مظهر الشخصي', value: 'يفى بالتوقعات' },
    { label: 'تحمل المسؤولية', value: 'يفى بالتوقعات' },
    { label: 'المبادرة', value: 'يفى بالتوقعات' },
    { label: 'الأداء تحت ضغط العمل', value: 'يفى بالتوقعات' },
    { label: 'الإنتاجية', value: 'يفى بالتوقعات' },
    { label: 'جودة العمل', value: 'يفى بالتوقعات' },
    { label: 'تنظيم العمل', value: 'يفى بالتوقعات' },
    { label: 'العمل بروح الفريق', value: 'يفى بالتوقعات' },
    { label: 'الحفاظ على مواعيد العمل', value: 'يفى بالتوقعات' },
    { label: 'التقييم العام للأداء', value: 'يفى بالتوقعات' },
  ];

  const rows = [];
  for (let i = 0; i < data.length; i += 2) {
    rows.push(data.slice(i, i + 2));
  }

  return (
    <>
      <div className='bg-primary-opacity py-6 px-[18px] border-r-4 border-r-primary'>
        <h2 className='text-primary font-bold text-xl'>
          معايير تقييم فترة التجربة
        </h2>
      </div>
      <div>
        {rows.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className={cn(
              'grid grid-cols-2',
              rowIndex % 2 === 0 ? 'bg-grey-50' : ''
            )}
          >
            {row.map(({ label, value }, index) => (
              <div key={index} className='py-[22px] md:flex'>
                <div className='mx-3 md:basis-1/4 md:flex-1 md:max-w-[30%]'>
                  {label}
                </div>
                <div className='font-medium mx-3 text-darkBlue'>{value}</div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};
