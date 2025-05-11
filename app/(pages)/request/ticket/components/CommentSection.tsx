import { AnglesLeftIcon, UserRoundedIcon } from '@icons';
import { Button, Textarea } from '@ui';

export const CommentSection = () => {
  return (
    <div className='bg-white rounded-lg'>
      <h2 className='text-right text-foreground text-2xl font-semibold  border-b border-[#ECF0F480] p-4'>
        التواصل
      </h2>
      <div className='flex flex-col p-4 gap-4'>
        <p>لا يوجد أي تعليق حتى الأن</p>
        <Textarea
          className='pr-14 pt-5 text-right text-base border-none resize-none w-full shadow-none text-foreground placeholder:text-foreground placeholder:text-base rounded-sm bg-grey-50'
          rows={3}
          placeholder='اكتب رسالة'
          icon={<UserRoundedIcon />}
        />
        <Button className='w-fit p-6 rounded-lg text-xl font-bold shadow-none hover:bg-primary'>
          <span className='text-lg font-bold'>إرسال</span>
          <AnglesLeftIcon width={15} height={15} className='fill-white font-bold' />
        </Button>
      </div>
    </div>
  );
};
