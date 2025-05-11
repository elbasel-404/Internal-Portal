'use client';

import { AngleLeftIcon } from '@icons';
import { paths } from '@lib';
import type { NewsCardSlide, RelatedUser } from '@types';
import Link from 'next/link';
import { RelatedUsersCarousel } from './RelatedUsersCarousel';

interface HomePageSlidersProps {
  slides: NewsCardSlide[];
  relatedUsers: RelatedUser[];
}

export const HomePageSliders = ({ relatedUsers }: HomePageSlidersProps) => {
  return (
    <div className='flex lg:flex-row flex-col justify-between'>
      {/* <div className=" bg-white rounded-lg lg:w-[35%] mb-4 lg:mb-0">
        <div className="flex justify-between p-4 border-b border-light pb-2 mb-2">
          <h2 className="text-2xl font-bold">توعوية</h2>
        </div>
        <NewsCarousel slides={slides} />
      </div> */}
      <div className='bg-white lg:w-full min-w-[428px]'>
        {/* <div className='flex justify-between p-4 border-b border-light pb-2'>
          <p className='flex gap-1'>
            <span className='text-shadowBlue'>مجموع الموظفين:</span>
            <span className='text-primary'>20</span>
          </p>
        </div> */}
        <div className='p-4'>
          <RelatedUsersCarousel relatedUsers={relatedUsers} />
          <Link href={paths.employeeDepartment.href} className='group bg-primary-opacity rounded-full flex items-center justify-center gap-2 p-2 font-medium shadow-none hover:bg-primary hover:text-white w-full text-primary mt-6'>
            <span>التفاصيل</span>
            <AngleLeftIcon
              width={6}
              height={10}
              className='fill-primary group-hover:fill-white'
            />
          </Link>
        </div>
      </div>
    </div>
  );
};
