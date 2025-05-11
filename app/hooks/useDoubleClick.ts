import { useRef, useCallback } from 'react';

interface UseDoubleClickProps {
  onSingleClick?: (event: MouseEvent) => void;
  onDoubleClick?: (event: MouseEvent) => void;
  delay?: number;
}

export const useDoubleClick = ({
  onSingleClick,
  onDoubleClick,
  delay = 250,
}: UseDoubleClickProps) => {
  const clickCount = useRef(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleClick = useCallback(
    (event: MouseEvent) => {
      clickCount.current += 1;

      if (clickCount.current === 1) {
        timer.current = setTimeout(() => {
          if (onSingleClick) {
            onSingleClick(event);
          }
          clickCount.current = 0;
        }, delay);
      } else {
        if (timer.current !== null) {
          clearTimeout(timer.current);
        }
        if (onDoubleClick) {
          onDoubleClick(event);
        }
        clickCount.current = 0;
      }
    },
    [onSingleClick, onDoubleClick, delay]
  );

  const ref = useCallback(
    (
      node: {
        addEventListener: (
          arg0: string,
          arg1: (event: MouseEvent) => void
        ) => void;
      } | null
    ) => {
      if (node !== null) {
        node.addEventListener('click', handleClick);
      }
    },
    [handleClick]
  );

  return ref;
};
