import { IconProps } from '@types';

export const FlagIcon = ({ width, height }: IconProps) => {
  return (
    <svg
      style={{ width, height }}
      width='34'
      height='34'
      viewBox='0 0 34 34'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M32.4688 12.6133C33.8223 13.1289 33.8223 14.998 32.4688 15.5137L2.5625 26.5352V32.5938C2.5625 33.1738 2.04688 33.625 1.53125 33.625C0.951172 33.625 0.5 33.1738 0.5 32.5938V1.65625C0.5 1.14062 0.951172 0.625 1.53125 0.625C2.04688 0.625 2.43359 1.07617 2.49805 1.5918L32.4688 12.6133ZM2.5625 24.3438L30.4062 14.0312L2.5625 3.7832V24.3438Z'
        fill='#1989A7'
      />
    </svg>
  );
};
