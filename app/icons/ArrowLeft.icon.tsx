import { IconProps } from '@types';

export const ArrowLeftIcon = ({
  width = 11,
  height = 11,
  className,
}: IconProps) => {
  return (
    <svg
      style={{ width, height }}
      className={className}
      width={width}
      height={height}
      viewBox='0 0 11 10'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M10.75 5C10.75 5.21094 10.5625 5.375 10.3516 5.375H1.51562L4.79688 8.89062C4.9375 9.03125 4.9375 9.26562 4.77344 9.40625C4.70312 9.47656 4.60938 9.5 4.51562 9.5C4.39844 9.5 4.30469 9.47656 4.23438 9.38281L0.34375 5.25781C0.203125 5.11719 0.203125 4.90625 0.34375 4.76562L4.23438 0.640625C4.375 0.476562 4.60938 0.476562 4.77344 0.617188C4.9375 0.757812 4.9375 0.992188 4.79688 1.13281L1.51562 4.625H10.3516C10.5625 4.625 10.75 4.8125 10.75 5Z'
        className={className}
      />
    </svg>
  );
};
