import { BookmarkIcon, ClockIcon } from '@icons';
import Image from 'next/image';

type MonshaatItem = {
  id: number;
  title: string;
  date: string;
  image: string;
};

type MonshaatDataProps = {
  monshaatData: MonshaatItem[];
};

export const MonshaatGrid = ({ monshaatData }: MonshaatDataProps) => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-4 px-4'>
      {monshaatData.map((n) => (
        <div
          key={n.id}
          className='bg-white flex flex-col gap-4 group hover:-translate-y-1 transition-all ease-in-out duration-500'
        >
          <Image
            src={n.image}
            alt={n.title}
            width={200}
            height={200}
            className='w-full rounded-xl h-fit object-cover'
          />
          <div className='bg-white px-6 py-4 rounded-xl group-hover:bg-primary-opacity transition duration-500'>
            <div className='relative overflow-hidden'>
              <div className='absolute inset-0 flex items-center justify-between transform translate-x-full group-hover:translate-x-0 transition duration-500 ease-in-out'>
                <p className='text-sm text-gray-500 flex items-center gap-2'>
                  <ClockIcon />
                  <button>{n.date}</button>
                </p>
                <button>
                  <BookmarkIcon />
                </button>
              </div>

              <div className='flex items-center justify-between transform translate-x-0 group-hover:-translate-x-full transition duration-500 ease-in-out'>
                <p className='text-sm text-gray-500 flex items-center gap-2'>
                  <ClockIcon />
                  <button>{n.date}</button>
                </p>
                <button>
                  <BookmarkIcon />
                </button>
              </div>
            </div>

            <h5 className='text-xl font-medium text-foreground'>{n.title}</h5>
          </div>
        </div>
      ))}
    </div>
  );
};
