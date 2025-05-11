import { BookmarkIcon, ClockIcon } from '@icons';
import { Button } from '@ui';
import Image from 'next/image';
import Link from 'next/link';

type CardItem = {
  id: number;
  title: string;
  date: string;
  description: string;
  image: string;
};

type GlobalNewsCardProps = {
  cardData: CardItem[];
  path: string;
};

export const GlobalNewsCard = ({ cardData, path }: GlobalNewsCardProps) => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-4'>
      {cardData.map((n) => (
        <div
          key={n.id}
          className='bg-white flex flex-col hover:bg-grey-50 gap-4 p-4 border border-grey-50 rounded-xl'
        >
          <Image
            src={n.image}
            alt={n.title}
            width={200}
            height={200}
            className='w-full rounded-xl h-56 object-cover'
          />
          <div className='flex flex-col px-6 py-4 rounded-xl space-y-2'>
            <div className='overflow-hidden'>
              <div className='flex items-center justify-between'>
                <p className='text-sm text-gray-500 flex items-center gap-2'>
                  <ClockIcon />
                  <button>{n.date}</button>
                </p>
                <button>
                  <BookmarkIcon />
                </button>
              </div>
            </div>

            <h5 className='text-xl font-bold text-foreground leading-6'>
              {n.title}
            </h5>
            <span className='text-[#354A64] text-sm'>{n.description}</span>
            <Link
              href={{ pathname: path.replace(/:\w+$/, '') + `/${n.id}` }}
              className='w-fit'
            >
              <Button className='w-14 h-6 bg-transparent text-grey-400 shadow-none rounded-none text-sm font-bold border-b-2 border-grey-400 hover:text-primary hover:border-primary'>
                اقرأ المزيد
              </Button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};
