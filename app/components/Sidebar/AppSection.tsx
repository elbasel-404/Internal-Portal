import { DownloadIcon } from '@icons';
import { paths } from '@lib';
import { Button } from '@ui';
import Image from 'next/image';
import Link from 'next/link';
interface SideBarContentProps {
  isOpen: boolean;
}

export const AppSection = ({ isOpen }: SideBarContentProps) => {
  return (
    <>
      {isOpen && (
        <div>
          <Image
            width={100}
            height={100}
            src='/background app.svg'
            alt='background app'
            className='w-full h-full relative top-0 lg:top-40'
          />
          <div className='h-96 w-56 bg-gradient-to-b from-primary to-foreground flex flex-col gap-3 justify-center items-center rounded-xl bg-primary z-20 relative right-5 lg:right-7 bottom-96 lg:bottom-20'>
            <div className='flex flex-col items-center gap-2'>
              <p className='text-white text-lg'>خدماتك الوظيفية بين يديك!</p>
              <h2 className='text-white text-2xl font-bold text-center'>
                حمل التطبيق الآن
              </h2>
              <Link href={paths.employeeApplication.href}>
                <Button className='bg-darkBlue rounded-sm px-4 py-6 w-fit font-medium text-base shadow-none hover:bg-darkBlue flex justify-center items-center'>
                  تطبيق الموظفين
                  <DownloadIcon />
                </Button>
              </Link>
            </div>
            <Image
              width={300}
              height={300}
              src='/app.svg'
              alt='app'
              className='w-full px-4'
            />
          </div>
        </div>
      )}
    </>
  );
};
