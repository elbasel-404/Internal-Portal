import { BookmarkIcon, ClockIcon } from '@icons';
import { Card } from '@ui';
import Image from 'next/image';
import { newsData } from './config';

export const NewsCardSection = () => {
  const sideNews = newsData.filter((news) => !news.isFeatured);

  return (
    <div className='col-span-1 flex flex-col w-full'>
      {sideNews.map((news) => (
        <Card
          key={news.id}
          className='flex items-center gap-4 p-2 shadow-none border-none transition'
        >
          <Image
            width={100}
            height={100}
            src={news.image}
            alt={news.title}
            className='w-fit h-fit object-cover rounded-md'
          />
          <div className='flex flex-col gap-3'>
            <div className='flex items-center justify-between '>
              <p className='text-sm text-gray-500 flex items-center gap-1'>
                <ClockIcon />
                <span className='mt-1'>{news.date}</span>
              </p>
              <BookmarkIcon className='hover:fill-primary hover:cursor-pointer' />
            </div>
            <h3 className='text-foreground text-lg leading-tight'>
              {news.title}
            </h3>
          </div>
        </Card>
      ))}
    </div>
  );
};
