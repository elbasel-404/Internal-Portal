import { IconProps } from '@types';

export const TableIcon = ({ width, height, className }: IconProps) => {
  return (
    <svg
      style={{ width, height }}
      width='24'
      height='22'
      viewBox='0 0 24 22'
      className={className}
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M21 0.5C22.6406 0.5 24 1.85938 24 3.5V18.5C24 20.1875 22.6406 21.5 21 21.5H3C1.3125 21.5 0 20.1875 0 18.5V3.5C0 1.85938 1.3125 0.5 3 0.5H21ZM6.375 19.25V9.125H2.25V18.5C2.25 18.9219 2.57812 19.25 3 19.25H6.375ZM21.75 18.5V9.125H8.625V19.25H21C21.375 19.25 21.75 18.9219 21.75 18.5ZM21.75 6.875V3.5C21.75 3.125 21.375 2.75 21 2.75H3C2.57812 2.75 2.25 3.125 2.25 3.5V6.875H21.75Z'
        className={className}
      />
    </svg>
  );
};
