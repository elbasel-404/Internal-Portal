'use client';

import { isSubmitted } from '@atoms';
import { CheckIcon, XMarkIcon } from '@icons';
import { Button } from '@ui';
import { useSetAtom } from 'jotai';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export const ConfimationForm = () => {
  const router = useRouter();

  const setSubmitted = useSetAtom(isSubmitted);

  const closeModal = () => {
    router.back();
  };

  const handleConfirm = async () => {
    setSubmitted(true); // Show success message
    closeModal(); // Close modal
  };

  return (
    <div className='flex flex-col gap-4 px-4 mt-4'>
      <div className='flex flex-col items-center justify-center gap-3'>
        <Image
          src='/paper-plane.svg'
          alt=''
          width={100}
          height={100}
          className='w-fit h-fit'
        />
        <p className='text-xl font-bold text-darkBlue'>
          هل انت متأكد من ارسال الطلب؟
        </p>
      </div>
      <div className='flex justify-end mb-2 gap-2'>
        <Button
          onClick={closeModal}
          type='button'
          className='flex items-center gap-1 bg-[#DEE5ED] text-stormGray shadow-none hover:bg-gray-300 rounded-xl p-4'
        >
          <XMarkIcon className='fill-stormGray w-5 h-5' />
          إغلاق
        </Button>

        <Button
          onClick={handleConfirm}
          className='flex items-center gap-1 bg-primary-opacity group text-primary shadow-none hover:bg-primary hover:text-white rounded-xl p-4'
          type='button'
        >
          <CheckIcon className='fill-primary group-hover:fill-white' />
          موافق
        </Button>
      </div>
    </div>
  );
};
