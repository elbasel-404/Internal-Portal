'use client';

import { costsAtom } from '@atoms';
import { Table } from '@components';
import { ModalLink } from '@components/modals/ModalLink';
import { CirclePlusIcon, RiyalCurrencyIcon } from '@icons';
import { removeProduct } from '@server';
import { ProductSchema } from '@zodSchemas';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { z } from 'zod';

const tableHeaders = [
  { label: 'المنتج' },
  { label: 'الوصف' },
  { label: 'الكمية' },
  { label: 'سعر الوحدة' },
  { label: 'الضريبة' },
  { label: 'الإجمالي بدون ضريبة' },
  { label: 'الإجمالي مع الضريبة' },
  { label: 'الإجراءات' },
];

type Data = z.infer<typeof ProductSchema>;

interface ProductsProps {
  data: Data[];
}

export const ProductsSection = ({ data }: ProductsProps) => {
  const [costs, setCosts] = useAtom(costsAtom);

  const extractNumberUsingRegex = (str: string) => {
    const matches = str.match(/\d+/g);
    return matches ? matches[0] : null;
  };

  const productsData = data.map((productDetails, index) => {
    const quantity = Number(productDetails.quantity || 0);
    const unitPrice = productDetails.unitPrice;
    const tax = Number(extractNumberUsingRegex(productDetails.tax));

    const totalWithoutTax = (quantity * Number(unitPrice)).toString();
    const taxAmount = Number(totalWithoutTax) * (tax / 100);
    const totalWithTax = Number(totalWithoutTax) + taxAmount;

    return {
      ...productDetails,
      id: index + 'id',
      totalWithoutTax,
      totalWithTax,
    };
  });

  const handleRemove = (id: number) => {
    void removeProduct(id);
  };

  const totalAmount = productsData.reduce(
    (acc, curr) => acc + curr.totalWithTax,
    0
  );

  useEffect(() => {
    setCosts(totalAmount);
  }, [totalAmount, setCosts]);

  return (
    <>
      <div className='flex flex-col md:flex-row gap-4 items-start md:items-center justify-between bg-primary-opacity py-6 px-[18px] border-r-4 border-r-primary'>
        <h2 className='text-darkBlue font-bold text-xl'>
          المنتجات<span className='text-red-500'>*</span>
        </h2>
        <ModalLink
          name='ProductsModal'
          className='flex group text-sm font-medium items-center gap-2 bg-primary text-white px-4 py-1 rounded-full hover:bg-primary-opacity hover:text-primary border-2 border-primary'
        >
          <CirclePlusIcon className='fill-white group-hover:fill-primary' />
          إضافة عنصر
        </ModalLink>
      </div>

      {productsData.length > 0 && (
        <>
          <Table
            tableClassName='h-fit'
            columns={tableHeaders}
            rows={productsData}
            toggleId={false}
            toggleDelete
            onRemove={handleRemove}
          />
          <div className='p-4 bg-cloudGray flex items-center justify-end pl-20 gap-4 sm:gap-10'>
            <p className='text-foreground font-medium'>الإجمالي مع الضريبة</p>
            <span className='flex items-center gap-2 text-foreground font-medium text-xl'>
              {totalAmount}
              <RiyalCurrencyIcon />
            </span>
          </div>
        </>
      )}
    </>
  );
};
