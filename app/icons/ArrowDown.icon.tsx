import { IconProps } from "@types"

export const ArrowDownIcon = ({
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
      viewBox="0 0 11 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.14062 6.9375L5.07812 11.0625C5.19531 11.1797 5.33594 11.2266 5.5 11.2266C5.64062 11.2266 5.78125 11.1797 5.89844 11.0625L9.83594 6.9375C10.0469 6.70312 10.0469 6.35156 9.8125 6.14062C9.60156 5.92969 9.22656 5.92969 9.01562 6.16406L6.0625 9.28125V1.3125C6.0625 0.984375 5.80469 0.75 5.5 0.75C5.21875 0.75 4.9375 0.984375 4.9375 1.3125V9.28125L1.96094 6.16406C1.75 5.92969 1.375 5.92969 1.16406 6.14062C0.929688 6.35156 0.929688 6.72656 1.14062 6.9375Z"
        className={className}
      />
    </svg>
  )
}
