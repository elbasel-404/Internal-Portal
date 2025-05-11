// // app/hooks/useKeyPress.ts
// 'use client';

// import { KeyboardAlphaNumericKey } from '@types';
// import { useCallback, useEffect } from 'react';

// interface UseKeyPressOptions {
//   key: KeyboardAlphaNumericKey;
//   withCommandKey?: boolean;
//   callback: () => void;
// }

// export const useKeyPress = ({
//   key,
//   withCommandKey = false,
//   callback,
// }: UseKeyPressOptions) => {
//   const handleKeyDown = useCallback(
//     (event: KeyboardEvent) => {
//       const isKeyMatch = event.key === key;
//       const isCommandKeyPressed = event.ctrlKey;
//       event.preventDefault();

//       if (withCommandKey && isCommandKeyPressed && isKeyMatch) {
//         callback();
//         return;
//       }

//       if (!withCommandKey && isKeyMatch) {
//         callback();
//       }
//     },
//     [callback, key, withCommandKey]
//   );

//   useEffect(() => {
//     document.addEventListener('keydown', handleKeyDown);

//     return () => {
//       document.removeEventListener('keydown', handleKeyDown);
//     };
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);
// };

// // Example Usage:
// //
// // import useKeyPress from "./useKeyPress";
// //
// // const MyComponent = () => {
// //   useKeyPress({
// //     key: "k",
// //     withCommandKey: true,
// //     callback: () => {
// //       console.log("Ctrl+K was pressed!");
// //     },
// //   });
// //
// //   return <div>Press Ctrl+K!</div>;
// // };
