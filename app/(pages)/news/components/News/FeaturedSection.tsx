import { BookmarkIcon } from '@icons';
import { Card, CardContent } from '@ui';
import Image from 'next/image';
import { newsData } from './config';

export const FeaturedSection = () => {
  const featuredNews = newsData.find((news) => news.isFeatured);

  return (
    <>
      {featuredNews && (
        <Card className='lg:col-span-2 relative w-full h-full xl:h-[430px] overflow-hidden rounded-lg'>
          <Image
            width={100}
            height={100}
            src={featuredNews.image}
            alt={featuredNews.title}
            className='w-full h-full xl:h-[430px] object-cover'
          />
          <CardContent className='absolute bottom-0 left-0 right-0 bg-gradient-to-t from-foreground/70 to-transparent p-6 text-white'>
            <div className='flex justify-between items-center text-gray-300 text-sm'>
              <span>{featuredNews.date}</span>
              <BookmarkIcon className='fill-white cursor-pointer' />
            </div>
            <h3 className='text-2xl font-bold mt-2'>{featuredNews.title}</h3>
            <p className='text-gray-200 mt-1'>{featuredNews.description}</p>
          </CardContent>
        </Card>
      )}
    </>
  );
};
