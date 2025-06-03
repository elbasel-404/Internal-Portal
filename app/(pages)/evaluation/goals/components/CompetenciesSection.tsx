import { Table } from '@components';
import { CircleArrowLeftIcon, CircleMinusIcon, CirclePlusIcon } from '@icons';
import { Button } from '@ui';
import { useEffect, useRef, useState } from 'react';

interface CompetencyData {
  id: string;
  competencyName: string;
  agreementLevel: string;
}

interface Subsection {
  title: string;
  data?: CompetencyData[];
}

interface CompetenciesSectionProps {
  title: string;
  subsections?: Subsection[];
  subtitle?: string;
  data?: CompetencyData[];
  defaultExpanded?: boolean;
}

const tableHeaders = [{ label: 'اسم الجدارة' }, { label: 'مستوى الاتفاق' }];

export const CompetenciesSection = ({
  title,
  subsections,
  subtitle,
  data,
  defaultExpanded = false,
}: CompetenciesSectionProps) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const [contentHeight, setContentHeight] = useState<number | undefined>(
    undefined
  );

  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [isExpanded]);

  return (
    <div className='w-full bg-white rounded-lg mb-4'>
      {/* Header */}
      <button
        onClick={(e) => {
          e.preventDefault();
          setIsExpanded(!isExpanded);
        }}
        className={`w-full px-6 py-4 bg-white transition-all duration-300 ease-out ${isExpanded ? 'rounded-t-lg' : 'rounded-lg'} flex items-center justify-between text-right transform `}
      >
        <h2 className='text-2xl font-semibold text-foreground duration-300'>
          {title}
        </h2>
        <div className='flex items-center gap-3'>
          <div className={`transition-transform duration-500 ease-out`}>
            {isExpanded ? (
              <CircleMinusIcon />
            ) : (
              <CirclePlusIcon className='fill-primary' />
            )}
          </div>
        </div>
      </button>

      {/* Content */}
      <div
        className={`transition-all duration-700 ease-out overflow-hidden ${
          isExpanded ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          height: isExpanded ? `${contentHeight}px` : '0px',
          transform: isExpanded ? 'translateY(0)' : 'translateY(-10px)',
        }}
      >
        <div ref={contentRef}>
          {/* Render subsections if they exist */}
          {subsections && subsections.length > 0 ? (
            subsections.map((subsection, index) => (
              <div key={index}>
                <div className='flex flex-col md:flex-row gap-4 items-start md:items-center justify-between bg-primary-opacity py-4 px-[18px] border-r-[3px] border-r-primary'>
                  <p className='text-xl font-bold text-primary'>
                    {subsection.title}
                  </p>
                </div>

                <Table
                  toggleId={false}
                  columns={tableHeaders}
                  rows={
                    subsection.data?.map((item) => ({
                      id: item.id,
                      competencyName: item.competencyName,
                      agreementLevel: item.agreementLevel,
                    })) || []
                  }
                  tableClassName='h-fit'
                />
                <div className='p-4'>
                  <Button className='group bg-white text-primary text-lg rounded-full flex items-center justify-center gap-2 p-2 font-medium shadow-none w-full border-2 border-primary mt-6'>
                    <span>تفاصيل {subsection.title}</span>
                    <CircleArrowLeftIcon />
                  </Button>
                </div>
              </div>
            ))
          ) : (
            /* Render single subsection for backward compatibility */
            <>
              {subtitle && (
                <div className='flex flex-col md:flex-row gap-4 items-start md:items-center justify-between bg-primary-opacity py-4 px-[18px] border-r-[3px] border-r-primary'>
                  <p className='text-xl font-bold text-primary'>{subtitle}</p>
                </div>
              )}

              <Table
                toggleId={false}
                columns={tableHeaders}
                rows={
                  data?.map((item) => ({
                    id: item.id,
                    competencyName: item.competencyName,
                    agreementLevel: item.agreementLevel,
                  })) || []
                }
                tableClassName='h-fit'
              />
              <div className='p-4'>
                <Button className='group bg-white text-primary text-lg rounded-full flex items-center justify-center gap-2 p-2 font-medium shadow-none w-full border-2 border-primary mt-6'>
                  <span>تفاصيل {subtitle ? subtitle : title}</span>
                  <CircleArrowLeftIcon />
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
