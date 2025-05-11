import Image from 'next/image';
import { ClockIcon, DashedLineIcon } from '@icons';
import { NewsCardSlide } from '@types';

interface InfoCardProps {
  slide: NewsCardSlide;
}

export const NewsCard = ({
  slide: { date, day, month, title, image },
}: InfoCardProps) => {
  return (
    <div className='rounded-xl flex flex-col items-center px-2'>
      <div className='flex items-center gap-2'>
        <DashedLineIcon />
        <div className=' flex text-white justify-center flex-col items-center bg-oceanBlue rounded-full w-20 h-20 aspect-square'>
          <span className='font-bold text-2xl'>{day}</span>
          <span>{month}</span>
        </div>
        <div className='flex flex-col '>
          <p className='text-sm text-gray-500 flex gap-1 items-center'>
            <ClockIcon />
            <span>{date}</span>
          </p>
          <h2 className='mb-1 text-foreground text-sm'>{title}</h2>
        </div>
      </div>
      <Image
        width={520}
        height={240}
        src={image}
        alt=''
        className='h-[240px] w-[520px] mb-5 rounded-xl mt-4'
      />
    </div>
  );
};
