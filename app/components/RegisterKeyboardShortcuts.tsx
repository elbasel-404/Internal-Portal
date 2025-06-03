// app/components/RegisterKeyboardShortcuts.tsx
"use client"

// import { useKeyPress } from '@hooks';
// import { usePathname, useRouter } from 'next/navigation';
import { keyboardShortcuts } from "../lib/keyboardShortcuts/keyboardShortcuts"

export const RegisterKeyboardShortcuts = () => {
  keyboardShortcuts.forEach(({ key, withCommandKey, callback }) => {
    document.addEventListener("keydown", (event) => {
      const isKeyMatch = event.key === key
      const isCommandKeyPressed = event.ctrlKey

      if (isKeyMatch) event.preventDefault()

      if (withCommandKey && isCommandKeyPressed && isKeyMatch) {
        callback()
        return
      }

      if (!withCommandKey && isKeyMatch) {
        callback()
      }
    })
  })

  // const router = useRouter();
  // const pathName = usePathname();

  // useKeyPress({
  //   key: 'k',
  //   withCommandKey: true,
  //   callback: () => {
  //     // TODO: add type for url
  //     const url = '/modal/HomePageSettingsModal';
  //     // Close modal
  //     if (pathName === url) {
  //       router.back();
  //       return;
  //     }
  //     // Open modal
  //     router.push(url);
  //   },
  // });
  return null
}
