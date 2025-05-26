'use client';

import type { Employee } from '@types';
import { Carousel, type CarouselApi, CarouselItem } from '@ui';
import { useWindowSize } from '@uidotdev/usehooks';
import { cn } from '@utils';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { RelatedUserCard } from './RelatedUserCard';

const CarouselContent = dynamic(
  () => import('../../../../../ui/carousel').then((mod) => mod.CarouselContent),
  { ssr: false }
);

interface RelatedUsersCarouselProps {
  relatedUsers: Employee[];
  className?: string;
}

const getNumUsersPerPage = (width: number) => {
  if (width >= 1024) return 4;
  if (width >= 768) return 2;
  return 1;
};

export const RelatedUsersCarousel = ({
  relatedUsers,
  className,
}: RelatedUsersCarouselProps) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const { width } = useWindowSize();
  const numUsersPerPage = getNumUsersPerPage(width ?? 0);

  useEffect(() => {
    if (!api) return;

    const handleSelect = () => setCurrent(api.selectedScrollSnap() + 1);
    api.on('select', handleSelect);

    setCurrent(api.selectedScrollSnap() + 1);

    return () => {
      api.off('select', handleSelect);
    };
  }, [api]);

  const pages = Math.ceil(relatedUsers.length / numUsersPerPage);

  return (
    <Carousel
      setApi={setApi}
      opts={{ align: 'end', direction: 'rtl' }}
      className={cn('select-none cursor-pointer w-full', className)}
    >
      <CarouselContent>
        {relatedUsers.map((user) => (
          <CarouselItem key={user.id} className='md:basis-1/2 lg:basis-1/4'>
            <div className='p-1'>
              <RelatedUserCard {...user} />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className='flex gap-2 mx-auto w-fit mt-4'>
        {Array.from({ length: pages }).map((_, index) => {
          const scrollTo = index * numUsersPerPage;
          const isCurrentPage =
            Math.floor(current / numUsersPerPage) ===
            (numUsersPerPage === 1 ? index + 1 : index);

          return (
            <button
              key={index}
              onClick={() => api?.scrollTo(scrollTo)}
              className={cn(
                'bg-[#D9D9D9] w-3 h-3 rounded-full',
                isCurrentPage && 'bg-primary'
              )}
            />
          );
        })}
      </div>
      <div className='flex justify-center items-center gap-2 mt-4'>
        <span className='text-shadowBlue text-lg'>مجموع الموظفين: </span>
        <span className='text-lg text-primary'>{relatedUsers.length}</span>
      </div>
    </Carousel>
  );
};
