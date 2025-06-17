// import {
//   getGeneralInfo,
//   getHomePageSlots,
//   getUserId,
//   revalidateHomePage,
// } from '@server';
// import { getSlotTitle } from '@utils';
// import { Modal } from '../Modal';
// import { ToggleForm } from './ToggleForm';

// // TODO: Test with other values?
// export const dynamic = 'force-dynamic';

// export const HomePageSettingsModal = async () => {
//   const userId = await getUserId();

//   const homePageSlots = await getHomePageSlots(userId);
//   const generalInfo = await getGeneralInfo(userId);

//   // ! Caution: assumes the order of the slots
//   const generalInfoSlot = homePageSlots.at(1);
//   const completeProfileSlot = homePageSlots.at(0);
//   const restOfHomePageSlots = homePageSlots.slice(2);
//   // const isGeneralInfoActive = generalInfoSlot?.active;
//   // const numActiveGeneralInfo = generalInfo.reduce(
//   //   (count, slot) => (slot.active ? count + 1 : count),
//   //   0
//   // );

//   const firstColumnSlots = [generalInfoSlot, generalInfo];
//   const secondColumnSlots = [restOfHomePageSlots, completeProfileSlot];

//   const renderFirstColumn = () => {
//     return firstColumnSlots?.flat().map((slot) => {
//       if (!slot) return;

//       const shouldRenderToggle = slot.key !== 'generalInfo';
//       const slotKey = slot.key;
//       const slotType = slot.slotType;

//       const slotTitle = getSlotTitle({
//         key: slotKey,
//         type: slotType,
//       });

//       return (
//         <ToggleForm
//           renderToggle={shouldRenderToggle}
//           userId={userId}
//           slotType={slot.slotType}
//           slotTitle={slotTitle}
//           slotKey={slot.key}
//           key={slot.key}
//           active={slot.active}
//         />
//       );
//     });
//   };

//   const renderSecondColumn = () => {
//     return secondColumnSlots?.flat().map((slot) => {
//       if (!slot) return;
//       const slotTitle = getSlotTitle({
//         key: slot.key,
//         type: slot.slotType,
//       });
//       return (
//         <ToggleForm
//           userId={userId}
//           slotType={slot.slotType}
//           slotTitle={slotTitle}
//           slotKey={slot.key}
//           key={slot.key}
//           active={slot.active}
//         />
//       );
//     });
//   };

//   return (
//     <Modal
//       // * Or if the database is hosted on a different server:
//       // * `router.refresh()` will be faster than revalidateHomepage()
//       // refreshOnClose={true}
//       onModalClose={revalidateHomePage}
//       introContentClassName='slide-in-from-bottom-full'
//       outroContentClassName='slide-out-to-bottom-full'
//     >
//       <div className='grid grid-cols-1 md:grid-cols-2 overflow-y-auto h-full app-scrollbar'>
//         <div>{renderFirstColumn()}</div>
//         <div>{renderSecondColumn()}</div>
//       </div>
//     </Modal>
//   );
// };
