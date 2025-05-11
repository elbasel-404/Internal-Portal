import { IconProps } from '@types';

export const LockIcon = ({ width, height }: IconProps) => {
  return (
    <svg
      style={{ width, height }}
      width='18'
      height='23'
      viewBox='0 0 18 23'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g clipPath='url(#clip0_6037_64167)'>
        <path
          d='M0.565186 10.0488H16.6913V19.429L14.4905 22.5306H2.82973L0.565186 19.429V10.0488Z'
          stroke='#006F93'
          strokeWidth='1.37'
          strokeMiterlimit='10'
        />
        <path
          d='M13.757 9.82898V3.55044L11.5562 1.39062H5.69391L3.49316 3.55044V9.82898'
          stroke='#006F93'
          strokeWidth='1.37'
          strokeMiterlimit='10'
        />
      </g>
      <defs>
        <clipPath id='clip0_6037_64167'>
          <rect
            width='17'
            height='22'
            fill='white'
            transform='translate(0.125 0.957031)'
          />
        </clipPath>
      </defs>
    </svg>
  );
};
