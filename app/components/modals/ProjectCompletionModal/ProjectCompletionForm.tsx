'use client';

import { costsAtom, dateFromAtom, dateToAtom } from '@atoms';
import { InputField } from '@components/form';
import { CheckIcon, RiyalCurrencyIcon, XMarkIcon } from '@icons';
import { Button } from '@ui';
import { useLocalStorage } from '@uidotdev/usehooks';
import { useAtom } from 'jotai';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { projectCompletionFormAction } from './ProjectCompletionFormAction';

export const ProjectCompletionForm = () => {
  const router = useRouter();
  const [phaseName, setPhaseName] = useState('');
  const [year, setYear] = useState('');
  const [amount, setAmount] = useState(0);
  const [costs] = useAtom(costsAtom);
  const [dateToProject] = useAtom(dateToAtom);
  const [dateFromProject] = useAtom(dateFromAtom);

  const projectStartDate = new Date(dateFromProject).getFullYear();
  const projectEndDate = new Date(dateToProject).getFullYear();

  // I will change it later
  const [localCosts, setLocalCosts] = useLocalStorage('costs', costs);

  const handlePhaseNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPhaseName(e.target.value);
  };

  const handleYearChange = (e: ChangeEvent<HTMLInputElement>) => {
    setYear(e.target.value);
  };

  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(e.target.value) || 0);
  };

  const closeModal = () => {
    router.back();
  };

  useEffect(() => {
    if (localCosts) {
      setLocalCosts(costs);
    }
  }, [costs]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (amount > localCosts) {
      e.preventDefault();
      toast.error('المبلغ المتوقع تخطى التكاليف');
    }

    if (year !== projectEndDate.toString()) {
      toast.error('تاريخ المرحلة لا يتوافق مع تاريخ المشروع');
    }

    if (localCosts !== 0) {
      setLocalCosts((prev) => Math.abs(prev - amount));
    }

    closeModal();
  };

  return (
    <form
      action={projectCompletionFormAction}
      onSubmit={handleSubmit}
      className='flex flex-col gap-4 px-4 mt-4'
    >
      <InputField
        label='اسم المرحلة'
        name='phaseName'
        placeholder=''
        required
        value={phaseName}
        onChange={handlePhaseNameChange}
      />
      <InputField
        label='السنة'
        name='year'
        placeholder=''
        required
        value={year}
        onChange={handleYearChange}
      />
      <InputField
        label='المبلغ المتوقع'
        name='amount'
        placeholder=''
        required
        icon={<RiyalCurrencyIcon />}
        value={amount}
        onChange={handleAmountChange}
      />
      <div className='flex justify-end mb-2 gap-2'>
        <Button
          onClick={closeModal}
          type='button'
          className='flex items-center gap-1 bg-[#DEE5ED] text-stormGray shadow-none hover:bg-gray-300 rounded-xl p-4'
        >
          <XMarkIcon className='fill-stormGray w-0 h-0' />
          إغلاق
        </Button>

        <Button
          className='flex items-center gap-1 bg-primary-opacity group text-primary shadow-none hover:bg-primary hover:text-white rounded-xl p-4'
          type='submit'
        >
          <CheckIcon className='fill-primary group-hover:fill-white' />
          إضافة
        </Button>
      </div>
    </form>
  );
};
