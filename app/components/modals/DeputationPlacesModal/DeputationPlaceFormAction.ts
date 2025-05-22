'use server';

import { db } from '@db'; // Database instance
import { getUserIndex } from '@db/actions';
import { getUserId } from '@server';
import { ProjectCompletionSchema } from '@zodSchemas';

export const deputationPlaceFormAction = async (formData: FormData) => {
  //TODO: Handle Store Places
  try {
    const formEntries = formData.entries();
    const rawData = Object.fromEntries(formEntries);

    const responseData = { ...rawData };

    const {
      success,
      data: validatedData,
      error,
    } = ProjectCompletionSchema.safeParse(responseData);

    console.log(success, validatedData, error);

    await db.read();

    const userId = await getUserId();
    if (!userId) {
      throw new Error(
        'Invalid User Id (app/components/modals/DeputationPlacesModal/DeputationPlaceFormAction.ts)'
      );
    }
    if (!success) {
      throw new Error(
        'Validation Error (app/components/modals/DeputationPlacesModal/DeputationPlaceFormAction.ts)',
        error
      );
    }
    const userIndex = await getUserIndex(userId);
    db.data.users[userIndex].projectCompletion.push(validatedData);

    await db.write();
  } catch (error) {
    console.error(error);
  }
};
