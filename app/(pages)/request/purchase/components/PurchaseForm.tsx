'use client';

import { purchaseTypeAtom } from '@atoms';
import { SubmitButton } from '@components/form';
import { ProductSchema, ProjectCompletionSchema } from '@zodSchemas';
import { useAtom } from 'jotai';
import { z } from 'zod';
import {
  AttachmentsSection,
  BasicInformationSection,
  ProductsSection,
  ProjectCompletionSection,
  ProjectDetailsSection,
  PurchaseFormHeader,
  RequirementsSection,
} from '../sections';

type ProjectCompletionData = z.infer<typeof ProjectCompletionSchema>;
type ProductsData = z.infer<typeof ProductSchema>;

interface PurchaseProps {
  projectCompletionData: ProjectCompletionData[];
  productsData: ProductsData[];
}
export const PurchaseForm = ({
  projectCompletionData,
  productsData,
}: PurchaseProps) => {
  const [purchaseType] = useAtom(purchaseTypeAtom);
  return (
    <form className='bg-white rounded-md p-4'>
      <PurchaseFormHeader />

      <div className='p-4 space-y-6'>
        <BasicInformationSection />
        <AttachmentsSection />
        <ProjectDetailsSection />
        <RequirementsSection />
        {purchaseType !== 'directPayment' ? (
          <ProjectCompletionSection data={projectCompletionData} />
        ) : (
          <ProductsSection data={productsData} />
        )}
        <SubmitButton />
      </div>
    </form>
  );
};
