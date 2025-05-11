// 'use server';

// import { db } from '@db';
// // import { getUser } from '@db/actions';
// import { HomePageSlotKey } from '@types';

// type Args = {
//   key: HomePageSlotKey;
//   index: number;
//   userId?: number;
// };
// const EXECLUDED_SLOTS = ['completeProfile', 'generalInfo'];

// export const handleDrag = async ({ key, index, userId }: Args) => {
//   debugger;
//   console.log('handleDrag', key, index, userId);
//   if (!userId) throw new Error('User ID is required');
//   await db.read();
//   const users = db.data.users;
//   const userIndex = users.findIndex((user) => user.id === userId);
//   const user = users[userIndex];
//   const currentSlots = user.activeHomePageSlotsKeys;
//   const currentIndex = currentSlots.indexOf(key);

//   // const currentSlotsDraggable = currentSlots.filter(
//   //   (slot) => !EXECLUDED_SLOTS.includes(slot)
//   // );

//   currentSlots.splice(currentIndex, 1);
//   currentSlots.splice(index - 1, 0, key);
//   db.data.users[userIndex].activeHomePageSlotsKeys = currentSlots;
//   await db.write();
//   if (currentIndex === -1) throw new Error('Slot not found');
//   // await db.update(({ users }) => {
//   //   users[userIndex].activeHomePageSlotsKeys = currentSlots;
//   // });

//   const result = {
//     success: true,
//     key,
//     originalIndex: currentIndex,
//     newIndex: index,
//   };
//   console.log({ result });
//   return result;
// };
