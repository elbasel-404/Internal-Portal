// 'use server';

// import type { GeneralInfoKey, HomePageSlotKey } from '@types';
// import {
//   validateGeneralInfoKey,
//   validateHomePageSlotKey,
// } from '@server/validation';
// import { toggleGeneralInfo, toggleHomePageSlot } from '@server';

// type Args = {
//   type: 'generalInfo' | 'homePage';
//   key: HomePageSlotKey | GeneralInfoKey;
//   active: boolean;
//   userId: number;
// };
// export const toggleHomePageSetting = async ({
//   type,
//   key,
//   active,
//   userId,
// }: Args) => {
//   if (type === 'generalInfo') {
//     const generalInfoKey = await validateGeneralInfoKey(key);
//     await toggleGeneralInfo({
//       key: generalInfoKey,
//       active,
//       userId,
//     });
//   }

//   if (type === 'homePage') {
//     const homePageSlotKey = await validateHomePageSlotKey(key);

//     await toggleHomePageSlot({
//       key: homePageSlotKey,
//       active,
//       userId,
//     });
//   }
// };
