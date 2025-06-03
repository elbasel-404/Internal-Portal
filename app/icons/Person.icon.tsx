import { IconProps } from "@types"

export const PersonIcon = ({
  className = "#007497",
  strokeStyle = "#007497",
  width = 31,
  height = 35,
}: IconProps) => {
  return (
    <svg
      style={{ width, height }}
      className={className}
      width={width}
      height={height}
      viewBox="0 0 31 35"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.4993 14.983C19.3606 14.983 22.4908 11.8528 22.4908 7.99151C22.4908 4.13021 19.3606 1 15.4993 1C11.638 1 8.50781 4.13021 8.50781 7.99151C8.50781 11.8528 11.638 14.983 15.4993 14.983Z"
        stroke={strokeStyle}
        strokeWidth="2"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.4995 33.9999H26.6859C28.2304 33.9999 29.4825 32.7478 29.4825 31.2033C29.4825 25.4693 26.0312 20.5415 21.0927 18.3838V22.8135C21.0927 23.6705 20.7074 24.4373 20.1004 24.9502L16.4016 28.0768C16.1581 28.2826 15.8433 28.4067 15.4995 28.4067C15.1556 28.4067 14.8408 28.2826 14.5973 28.0768L10.8985 24.9502C10.2916 24.4373 9.90625 23.6704 9.90625 22.8135V18.3838"
        stroke={strokeStyle}
        strokeWidth="2"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.90642 18.3838C4.96789 20.5415 1.5166 25.4693 1.5166 31.2033C1.5166 32.7478 2.76871 33.9999 4.31321 33.9999H15.4996"
        stroke={strokeStyle}
        strokeWidth="2"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.499 20.0166V22.8132"
        stroke={strokeStyle}
        strokeWidth="2"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.499 28.4072V34.0004"
        stroke={strokeStyle}
        strokeWidth="2"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
