'use server';

import { db } from '@db'; // Database instance
import { getUserIndex } from '@db/actions';
import { getUserId } from '@server';
import { ProductSchema } from '@zodSchemas';

export const batchsFormAction = async (formData: FormData) => {
  try {
    const formEntries = formData.entries();
    const rawData = Object.fromEntries(formEntries);

    const responseData = { ...rawData };

    const {
      success,
      data: validatedData,
      error,
    } = ProductSchema.safeParse(responseData);

    await db.read();

    console.log(success, validatedData, error);

    const userId = await getUserId();
    if (!userId) {
      throw new Error(
        'Invalid User Id (app/components/modals/BatchsModal/BatchsFormActions.ts)'
      );
    }
    if (!success) {
      throw new Error(
        'Validation Error (app/components/modals/BatchsModal/BatchsFormActions.ts)',
        error
      );
    }
    const userIndex = await getUserIndex(userId);
    db.data.users[userIndex].products.push(validatedData);

    await db.write();
  } catch (error) {
    console.error(error);
  }
};
