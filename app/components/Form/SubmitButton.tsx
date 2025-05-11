// SubmitButton.tsx
import { AnglesLeftIcon } from '@icons';

export const SubmitButton = () => {
  return (
    <div className='pt-0'>
      <button
        type='submit'
        className='w-full flex font-medium justify-center rounded-lg items-center gap-2 bg-primary text-white px-4 py-1 border-2 border-primary'
      >
        إرسال الطلب
        <AnglesLeftIcon width={18} height={18} className='fill-white' />
      </button>
    </div>
  );
};
