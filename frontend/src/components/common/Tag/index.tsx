import React from "react";

// Styled
import { TagStyled } from "./styled";

type TagProps = {
  bgColor?: string;
  color?: string;
  icon?: React.ReactNode | string;
  text: string;
  rounded?: string;
  paddingX?: string;
  paddingY?: string;
};

const Tag: React.FC<TagProps> = ({
  /* Background Color */
  bgColor = "bg-green-500",
  /* Text Color */
  color = "text-white",
  /* Icon */
  icon,
  /* Text */
  text,
  /* Rounded */
  rounded = "rounded-[14px]",
  /* Padding y-axis */
  paddingY = "py-0",
  /* Padding x-axis */
  paddingX = "px-3",
}) => {
  return (
    <TagStyled
      className={`${bgColor} ${rounded} flex items-center gap-[3px] ${paddingX} ${paddingY} justify-center`}
    >
      {icon && <span>{icon}</span>}
      <span className={`${color} font-inter text-xs font-normal`}>{text}</span>
    </TagStyled>
  );
};

export default Tag;
