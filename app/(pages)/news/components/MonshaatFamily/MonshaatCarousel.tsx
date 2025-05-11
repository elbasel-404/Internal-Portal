import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@ui';
import { MonshaatCard } from './MonshaatCard';
import { MonshaatCarouselData } from './config';

export const MonshaatCarousel = () => {
  return (
    <div>
      <Carousel
        opts={{
          loop: true,
          align: 'end',
          direction: 'rtl',
        }}
        className='p-4 px-12'
      >
        <CarouselContent>
          {MonshaatCarouselData.map((file, index) => (
            <CarouselItem key={index} className='basis-full md:basis-1/3'>
              <MonshaatCard {...file} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className='absolute -bottom-14 left-2 flex items-center justify-center bg-primary-opacity' />
        <CarouselNext className='absolute -bottom-14 right-2 flex items-center justify-center bg-primary-opacity' />
      </Carousel>
    </div>
  );
};
