'use client';

import { useEffect, useState } from 'react';
import { cn } from '@utils';
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '@ui';
import { NewsCardSlide } from '@types';
import { NewsCard } from './NewsCard';

interface NewsCarouselProps {
  slides: NewsCardSlide[];
  className?: string;
}

/**
 * RelatedUsersCarousel component props
  * @param slides - array of slides
  * @param className - additional classes
 */
export const NewsCarousel = ({ slides, className }: NewsCarouselProps) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap() + 1);

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <Carousel
      setApi={setApi}
      opts={{
        align: 'end',
        direction: 'rtl',
      }}
      className={cn('select-none cursor-pointer w-full', className)}
    >
      <CarouselContent>
        {slides.map((slide) => (
          <CarouselItem key={slide.id} className='basis-full'>
            <NewsCard slide={slide} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className='flex gap-2 mx-auto w-fit mt-4 pb-4'>
        {Array.from({ length: slides.length }).map((_, index) => {
          return (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={cn(
                'bg-gray-300 w-3 h-3 rounded-full',
                index + 1 === current && 'bg-primary'
              )}
            />
          );
        })}
      </div>
    </Carousel>
  );
};
