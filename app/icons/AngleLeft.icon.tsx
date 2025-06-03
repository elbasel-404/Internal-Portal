import { IconProps } from "@types"

export const AngleLeftIcon = ({ width, height, className }: IconProps) => {
  return (
    <svg
      style={{ width, height }}
      width="6"
      height="10"
      viewBox="0 0 6 10"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.53906 9.71875L0.628906 5.5625C0.519531 5.42578 0.4375 5.26172 0.4375 5.09766C0.4375 4.96094 0.519531 4.79688 0.628906 4.66016L4.53906 0.503906C4.78516 0.230469 5.19531 0.230469 5.46875 0.476562C5.74219 0.722656 5.74219 1.13281 5.49609 1.40625L1.96875 5.125L5.49609 8.81641C5.74219 9.08984 5.74219 9.5 5.46875 9.74609C5.19531 9.99219 4.78516 9.99219 4.53906 9.71875Z"
        className={className}
      />
    </svg>
  )
}
