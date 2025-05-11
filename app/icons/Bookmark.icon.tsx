import { IconProps } from '@types';

export const BookmarkIcon = ({ width, height, className }: IconProps) => {
  return (
    <svg
      style={{ width, height }}
      width='9'
      height='14'
      viewBox='0 0 9 14'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M7.875 0.849609C8.48438 0.849609 9 1.36523 9 1.97461V12.0996C9 12.6855 8.36719 13.0371 7.85156 12.7559L4.5 10.7871L1.125 12.7559C0.609375 13.0371 0 12.6855 0 12.0996V1.97461C0 1.36523 0.492188 0.849609 1.125 0.849609H7.875ZM7.875 11.4434V2.11523C7.875 2.04492 7.80469 1.97461 7.71094 1.97461H1.24219C1.17188 1.97461 1.125 2.04492 1.125 2.11523V11.4434L4.5 9.47461L7.875 11.4434Z'
        fill='#466386'
        className={className}
      />
    </svg>
  );
};
