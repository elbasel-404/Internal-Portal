// 'use client';

// import * as React from 'react';
// import { ChevronsUpDown, X } from 'lucide-react';
// import {
//   Button,
//   Collapsible,
//   CollapsibleContent,
//   CollapsibleTrigger,
// } from '@ui';
// import { useState, type ReactNode } from 'react';
// import { cn } from '@utils';
// import Form from 'next/form';
// import { revalidateHomePage, toggleHomePageSetting } from '@server';
// import type { HomePageSlotKey } from '@types';
// import { useDoubleClick } from '@hooks';
// // import { Animate } from './Animate';

// interface CollapseProps {
//   children: ReactNode;
//   title: string;
//   className?: string;
//   slotKey: HomePageSlotKey;
//   userId?: number;
// }
// export const Collapse = ({
//   children,
//   title,
//   slotKey,
//   userId,
//   className,
// }: CollapseProps) => {
//   const [isOpen, setIsOpen] = useState(true);
//   const toggleTriggerRef = useDoubleClick({
//     onDoubleClick: () => {
//       setIsOpen((prev) => !prev);
//     },
//     delay: 100,
//   });

//   return (
//     // <Animate>
//     <Collapsible
//       open={isOpen}
//       onOpenChange={setIsOpen}
//       className={cn("'border border-primary rounded-md'", className)}
//       ref={toggleTriggerRef}
//     >
//       <div className='flex items-center justify-between'>
//         <h4 className='text-sm font-semibold pr-10'>{title}</h4>
//         <div className='triggers flex items-center gap-2'>
//           <CollapsibleTrigger asChild>
//             <Button
//               variant='ghost'
//               className='border border-primary hover:text-white hover:bg-primary transition-colors'
//             >
//               <ChevronsUpDown className='h-4 w-4' />
//               <span className='sr-only'>Toggle</span>
//             </Button>
//           </CollapsibleTrigger>
//           <Form
//             action={async () => {
//               if (!userId) return;
//               await toggleHomePageSetting({
//                 key: slotKey,
//                 active: false,
//                 type: 'homePage',
//                 userId,
//               });
//               revalidateHomePage();
//             }}
//           >
//             <Button
//               type='submit'
//               variant='ghost'
//               className='border border-primary hover:text-white hover:bg-destructive transition-colors'
//             >
//               <X className='h-4 w-4' />
//             </Button>
//           </Form>
//         </div>
//       </div>
//       <CollapsibleContent className='mt-2'>{children}</CollapsibleContent>
//     </Collapsible>
//     // </Animate>
//   );
// };
