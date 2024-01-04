import React from "react";

// Styled
import { TagStyled } from "./styled";

type TagProps = {
  bgColor?: string;
  color?: string;
  icon?: React.ReactNode | string;
  text: string;
  rounded?: string;
  padding?: string;
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
  /* Padding */
  padding = "px-3 py-0",
}) => {
  return (
    <TagStyled
      className={`${bgColor} ${rounded} flex items-center gap-[3px] ${padding} justify-center w-fit`}
    >
      {icon && <span>{icon}</span>}
      <span className={`${color} font-inter text-xs font-normal`}>{text}</span>
    </TagStyled>
  );
};

export default Tag;
