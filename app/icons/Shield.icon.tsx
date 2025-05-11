import { IconProps } from '@types';

export const ShieldIcon = ({ width, height }: IconProps) => {
  return (
    <svg
      style={{ width, height }}
      width='16'
      height='17'
      viewBox='0 0 16 17'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M14.5625 3.125C15.125 3.375 15.5 3.90625 15.4688 4.5C15.4688 12.5938 9.5 16.5 7.96875 16.5C6.40625 16.5 0.5 12.5312 0.5 4.5C0.5 3.90625 0.84375 3.375 1.40625 3.125L7.40625 0.625C7.59375 0.5625 7.78125 0.5 8 0.5C8.1875 0.5 8.375 0.5625 8.5625 0.625L14.5625 3.125ZM8 15C10.0625 14.1562 14 10.8438 14 4.5L8 2.03125V15Z'
        fill='#1989A7'
      />
    </svg>
  );
};
