import {
  AnglesLeftIcon,
  ListTreeIcon,
  MailIcon,
  PhoneTagIcon,
  RecycleIcon,
  SignsPostIcon,
  UserHomeIcon,
} from '@icons';
import { Employee } from '@types';
import {
  Button,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@ui';
import Image from 'next/image';

export const RelatedUserCard = ({
  id,
  image,
  name,
  address,
  department,
  email,
  phone,
  position,
  recycleWork,
}: Employee) => {
  return (
    <div
      className='bg-cloudGray transition-colors rounded-[24px]
     p-4 w-full flex flex-col items-center'
    >
      <div className='flex flex-col items-center justify-center bg-white rounded-xl w-full p-4'>
        <Image
          width={100}
          height={100}
          src={image}
          alt='user-image'
          className='rounded-full h-[80px] w-[80px] mb-2'
        />
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <h2 className='text-darkBlue font-medium text-xl line-clamp-1'>
                {name}
              </h2>
              <p className='text-grey-600'>{position}</p>
            </TooltipTrigger>
            <TooltipContent className='bg-white'>
              <h2 className='mb-1 text-darkBlue line-clamp-1'>{name}</h2>
              <h2 className='mb-1 text-grey-600 line-clamp-1'>{position}</h2>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        {/* TODO: Export to color variables (abdelrahman) */}
        <p className='text-grey-600 my-4 bg-primary-opacity rounded-[50px] px-1.5'>
          {id}
        </p>

        <div className='flex justify-center items-center gap-2 p-2 rounded-md w-full bg-cloudGray font-normal'>
          <UserHomeIcon />
          {/* <span className='text-sm text-primary font-medium pt-1'>
            {workType}
          </span> */}
        </div>

        <div className='flex flex-col w-full gap-2.5 mt-4'>
          <div className='flex gap-3 items-center border-b border-cloudGray pb-2'>
            <div className='bg-cloudGray rounded-full p-2'>
              <PhoneTagIcon />
            </div>
            <p className='text-sm font-medium text-grey-600 pt-1'>{phone}</p>
          </div>
          <div className='flex gap-3 items-center border-b border-cloudGray pb-2'>
            <div className='bg-cloudGray rounded-full p-2'>
              <RecycleIcon />
            </div>
            <p className='text-sm font-medium text-grey-600 pt-1'>
              {recycleWork}
            </p>
          </div>
          <div className='flex gap-3 items-center border-b border-cloudGray pb-2'>
            <div className='bg-cloudGray rounded-full p-2'>
              <SignsPostIcon />
            </div>
            <p className='text-sm font-medium text-grey-600 pt-1'>{address}</p>
          </div>
          <div className='flex gap-3 items-center border-b border-cloudGray pb-2'>
            <div className='bg-cloudGray rounded-full p-2'>
              <ListTreeIcon width={15} height={15} className='fill-primary' />
            </div>
            <p className='text-sm font-medium text-grey-600 pt-1'>
              {department}
            </p>
          </div>
          <div className='flex gap-3 items-center border-b border-cloudGray pb-2'>
            <div className='bg-cloudGray rounded-full p-2'>
              <MailIcon />
            </div>
            <p className='text-sm font-medium text-grey-600 pt-1'>{email}</p>
          </div>
        </div>

        <Button
          className='pl-2 mt-4 rounded-md w-full bg-primary-opacity font-normal text-black hover:bg-primary-opacity'
          iconRight={false}
          icon={<AnglesLeftIcon width={11} height={10} />}
        >
          اقرأ المزيد
        </Button>
      </div>
    </div>
  );
};
