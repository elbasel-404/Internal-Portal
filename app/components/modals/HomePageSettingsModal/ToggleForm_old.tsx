// 'use client';

// import { toggleHomePageSetting } from '@server';
// import type { GeneralInfoKey, HomePageSlotKey } from '@types';
// import { Switch } from '@ui';
// import { cn } from '@utils';
// import { useRouter } from 'next/navigation';
// import { useState } from 'react';

// interface ToggleFormProps {
//   slotKey: HomePageSlotKey | GeneralInfoKey;
//   active: boolean;
//   className?: string;
//   slotTitle?: string;
//   slotType: 'generalInfo' | 'homePage';
//   userId: number;
//   refreshOnChange?: boolean;
//   renderToggle?: boolean;
// }

// export const ToggleForm = ({
//   slotKey,
//   active,
//   className,
//   slotTitle,
//   slotType,
//   userId,
//   refreshOnChange = false,
//   renderToggle = true,
// }: ToggleFormProps) => {
//   const [isChecked, setIsChecked] = useState(active);
//   const router = useRouter();

//   const toggleSettings = async (checked: boolean) => {
//     setIsChecked((prev) => !prev);
//     await toggleHomePageSetting({
//       active: checked,
//       key: slotKey,
//       type: slotType,
//       userId,
//     });
//     if (refreshOnChange) router.refresh();
//   };

//   const renderToggleForm = () => {
//     return (
//       <form className={cn('flex items-center', className)}>
//         <input
//           name='key'
//           type='text'
//           value={slotKey}
//           readOnly
//           aria-hidden
//           hidden
//         />
//         <Switch
//           checked={isChecked}
//           onCheckedChange={toggleSettings}
//           name='active'
//         />
//       </form>
//     );
//   };

//   return (
//     <div
//       className={cn(
//         'flex transition-colors items-center justify-between py-4 border-b border-primary-opacity',
//         slotType === 'homePage' ? 'font-medium px-3' : 'font-normal px-6'
//       )}
//     >
//       <div className='my-auto ml-10 min-w-max lg:ml-0'>{slotTitle}</div>
//       {renderToggle && renderToggleForm()}
//     </div>
//   );
// };
