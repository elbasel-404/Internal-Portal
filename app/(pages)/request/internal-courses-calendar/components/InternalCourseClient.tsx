'use client';

import { isSubmitted } from '@atoms';
import { CreateRequestStatus, RequestDetails } from '@components';
import { ModalLink } from '@components/modals/ModalLink';
import { AnglesLeftIcon, ArrowLeftIcon } from '@icons';
import { paths } from '@lib';
import type { RequestHeader, RequestStatus as RequestStatusType } from '@types';
import { useAtomValue, useSetAtom } from 'jotai';
import Image from 'next/image';
import Link from 'next/link';

interface InternalCourseClientProps {
  requestStatus: RequestStatusType[];
  requestCaption: string;
  requestHeaders: RequestHeader[];
}

export const InternalCourseClient = ({
  requestStatus,
  requestCaption,
  requestHeaders,
}: InternalCourseClientProps) => {
  const setConfirmed = useSetAtom(isSubmitted);
  const isConfirmed = useAtomValue(isSubmitted);

  return (
    <main className='space-y-6'>
      {isConfirmed ? (
        <div className='w-full bg-[#04AA6D] rounded-xl flex justify-between items-center p-4'>
          <div className='flex items-center gap-4'>
            <Image
              src='/check-icon.svg'
              alt='check icon'
              width={100}
              height={100}
              className='w-fit h-fit'
            />
            <p className='text-white font-medium'>
              تم تقديم الترشح للدورة التدريبية بنجاح
            </p>
          </div>
          <div>
            <Link
              href={paths.internalCoursesList.href}
              onClick={() => setConfirmed(false)}
              className='text-white flex items-center gap-4'
            >
              الرجوع لقائمة الطلبات
              <ArrowLeftIcon width={14} height={14} className='fill-white' />
            </Link>
          </div>
        </div>
      ) : (
        <>
          <CreateRequestStatus
            status={requestStatus}
            caption={requestCaption}
          />
          <RequestDetails headers={requestHeaders} />
          <ModalLink
            name='ConfirmationModal'
            className='flex font-medium justify-center rounded-lg items-center gap-2 bg-primary text-white px-4 py-1 border-2 border-primary'
          >
            <span className='text-lg font-bold'>التقدم للدورة</span>
            <AnglesLeftIcon width={18} height={18} className='fill-white' />
          </ModalLink>
        </>
      )}
    </main>
  );
};
