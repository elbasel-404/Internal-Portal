import { ArrowSquareIcon, BookmarkIcon, ClockIcon } from '@icons';
import { Button, Card, CardContent } from '@ui';
import { Download, Printer, Share2, ThumbsUp } from 'lucide-react';
import Image from 'next/image';

interface NewsCardProps {
  title: string;
  date: string;
  description: string;
  image: string;
}

export const PressFileCard = ({
  title,
  date,
  description,
  image,
}: NewsCardProps) => {
  return (
    <Card className='w-full bg-grey-50 border-none rounded-lg'>
      <CardContent className='p-4'>
        <div className='flex  justify-between'>
          <div className='flex items-center gap-3'>
            <Image
              width={120}
              height={120}
              src={image}
              alt='News Logo'
              className='w-[70px] h-[70px]  object-cover'
            />
            <div className='flex flex-col justify-between '>
              <p className='text-sm text-gray-500 flex items-center gap-1'>
                <ClockIcon />
                <span className='mt-1'>{date}</span>
              </p>
              <h3 className='font-medium text-primary text-lg'>{title}</h3>
            </div>
          </div>
          <div className='flex flex-col items-center justify-start gap-3 mt-2'>
            <BookmarkIcon />
            <ArrowSquareIcon />
          </div>
        </div>

        <p className='text-grey-600 text-sm mt-2'>{description}</p>

        <div className='flex flex-wrap gap-1 mt-4'>
          <Button
            variant='outline'
            className='flex gap-1 w-fit p-1 shadow-none bg-grey-100 px-2'
          >
            <ThumbsUp size={4} className='mr-2 text-grey-500' />
            <p className='text-sm text-grey-500 font-light'>أعجبني</p>
          </Button>
          <Button
            variant='outline'
            className='flex gap-1 w-fit p-1 shadow-none bg-grey-100 px-2'
          >
            <Share2 size={4} className='mr-2 text-grey-500' />
            <p className='text-sm text-grey-500 font-light'>مشاركة</p>
          </Button>
          <Button
            variant='outline'
            className='flex gap-1 w-fit p-1 shadow-none bg-grey-100 px-2'
          >
            <Download size={4} className='mr-2 text-grey-500' />
            <p className='text-sm text-grey-500 font-light'>تحميل</p>
          </Button>
          <Button
            variant='outline'
            className='flex gap-1 w-fit p-1 shadow-none bg-grey-100 px-2'
          >
            <Printer size={4} className='mr-2 text-grey-500' />
            <p className='text-sm text-grey-500 font-light'>طباعة</p>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
