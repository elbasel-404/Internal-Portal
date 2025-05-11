import { IconProps } from "@types";

export const CheckIcon = ({ className }: IconProps) => {
  return (
    <svg
      className={className}
      width="14"
      height="9"
      viewBox="0 0 14 9"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className={className}
        d="M13.125 1.27734L5.6875 8.71484C5.57812 8.85156 5.41406 8.90625 5.25 8.90625C5.05859 8.90625 4.89453 8.85156 4.78516 8.71484L0.847656 4.77734C0.574219 4.53125 0.574219 4.12109 0.847656 3.875C1.09375 3.60156 1.50391 3.60156 1.75 3.875L5.25 7.34766L12.2227 0.375C12.4688 0.101562 12.8789 0.101562 13.125 0.375C13.3984 0.621094 13.3984 1.03125 13.125 1.27734Z"
      />
    </svg>
  );
};
