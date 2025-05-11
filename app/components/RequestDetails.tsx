import { PdfFileIcon, PrinterIcon, TrashIcon } from '@icons';
import { colors } from '@lib';
import type { RequestHeader } from '@types';
import { Button } from '@ui';
import { cn } from '@utils';
import { ReactNode } from 'react';

interface RequestDetailsProps {
  headers: RequestHeader[];
  evaluationCritera?: ReactNode;
}

type AttachmentList = {
  label: 'المرفقات';
  value: File[];
};

export const RequestDetails = ({
  headers,
  evaluationCritera,
}: RequestDetailsProps) => {
  const attachmentHeader = headers.find(({ label }) => label === 'المرفقات');
  const convenantRequestNumber = headers.find(
    ({ label }) => label === 'رقم طلب العهدة'
  );
  const attachmentList: AttachmentList | undefined =
    attachmentHeader && Array.isArray(attachmentHeader.value)
      ? { label: 'المرفقات', value: attachmentHeader.value }
      : undefined;

  const notesHeaders = ['ملاحظات', 'المهام التي سيتم العمل عليها'];

  return (
    <section className='bg-white rounded-lg py-8 px-4 mt-6'>
      <h1 className='font-bold text-2xl mb-4'>
        {convenantRequestNumber
          ? 'بيانات استعاضة / اقفال عهدة'
          : 'تفاصيل الطلب'}
      </h1>
      <div>
        {headers.map(({ label, value }, index) => {
          const isEven = index % 2 === 0;
          const isNotes = notesHeaders.includes(label);
          const isAttachments = Array.isArray(value);
          if (isAttachments) return null;

          return (
            <div key={index}>
              {label === 'رقم طلب العهدة' && (
                <div className='text-foreground text-2xl font-bold my-3'>
                  بيانات العهدة
                </div>
              )}
              <div
                key={label}
                className={cn(
                  'py-[22px] flex flex-col md:flex-row',
                  isEven && 'bg-grey-50',
                  isNotes && 'flex-col'
                )}
              >
                <div className='mx-3 md:basis-1/4 md:flex-1 md:max-w-[15%]'>
                  {label}
                </div>
                <div
                  className='font-medium mx-3 text-darkBlue'
                  dangerouslySetInnerHTML={
                    typeof value === 'string' ? { __html: value } : undefined
                  }
                >
                  
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div>{evaluationCritera}</div>
      {attachmentList && (
        <AttachmentList attachmentList={attachmentList.value} />
      )}
    </section>
  );
};

interface AttachmentListProps {
  attachmentList: File[];
}
const AttachmentList = ({ attachmentList }: AttachmentListProps) => {
  return (
    <>
      <h2 className='py-3 '>المرفقات</h2>
      <div className='space-y-[10px]'>
        {Array.isArray(attachmentList) &&
          attachmentList.map((file) => (
            <FileAttachment key={file.name} file={file} />
          ))}
      </div>
    </>
  );
};

const FileAttachment = ({ file }: { file: File }) => {
  return (
    <div className='rounded-lg gap-3 px-4 flex items-center bg-grey-50 py-3 hover:bg-black/10 transition-colors cursor-pointer'>
      <div className='w-10 h-10 flex bg-[#FFF4CF] items-center rounded-md justify-center'>
        <PdfFileIcon className='w-4 h-4' />
      </div>
      {file.name}
      <div className='mr-auto flex gap-4'>
        <Button
          className='bg-primary-opacity rounded-sm w-6 h-6 p-0'
          title='Print'
        >
          <PrinterIcon
            className='w-3 h-3'
            width={12}
            height={12}
            fill={colors.light.primary}
          />
        </Button>
        <Button
          className='bg-primary-opacity rounded-sm w-6 h-6 p-0'
          title='Delete'
        >
          <TrashIcon
            className='w-3 h-3'
            width={12}
            height={12}
            fill={colors.light.primary}
          />
        </Button>
      </div>
    </div>
  );
};
