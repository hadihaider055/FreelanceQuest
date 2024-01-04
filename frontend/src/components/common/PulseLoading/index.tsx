import React from "react";

// Styled
import { PulseLoadingStyled, PulseStyled } from "./styled";

type PulseLoadingProps = {
  height?: number;
  width?: number | string;
  paddingBottom?: number | string;
  backgroundColor?: string;
};

const PulseLoading: React.FC<PulseLoadingProps> = ({
  height = 38,
  width = 160,
  paddingBottom = 0,
  backgroundColor = "rgba(255, 255, 255, 0.25)",
}) => {
  return (
    <PulseLoadingStyled
      height={height}
      width={width}
      backgroundColor={backgroundColor}
      paddingBottom={paddingBottom}
    >
      <PulseStyled />
    </PulseLoadingStyled>
  );
};

export default PulseLoading;
