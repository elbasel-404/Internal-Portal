import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

type NewsHeaderProps = {
  title: string;
  url?: string;
};

export const NewsHeader = ({ title, url }: NewsHeaderProps) => {
  return (
    <header className='flex flex-col xs:flex-row gap-2 justify-between items-center border-b border-[#ECF0F480] p-4'>
      <div className='flex flex-col md:flex-row gap-3 items-center justify-between'>
        <h2 className='text-darkBlue font-bold text-2xl'>{title}</h2>
      </div>
      <Link
        href={{ pathname: url }}
        className='text-white px-4 sm:px-8 py-1 text-lg font-bold bg-primary rounded-full shadow-none hover:bg-primary group transition-all duration-300 ease-in-out'
      >
        <span className='flex items-center'>
          شاهد الكل
          <ArrowLeft className='w-0 h-0 opacity-0 group-hover:w-5 group-hover:h-5 group-hover:opacity-100 group-hover:mr-2 transition-all duration-300 ease-in-out' />
        </span>
      </Link>
    </header>
  );
};
