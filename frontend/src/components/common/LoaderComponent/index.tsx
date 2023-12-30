import React from "react";

// Styled
import { LoaderComponentStyled } from "./styled";

//
import { Loader } from "../../icons";

interface LoaderComponentProps {
  size?: number;
  text?: string;
  color?: string;
  isFullPage?: boolean;
}

const LoaderComponent: React.FC<LoaderComponentProps> = ({
  size = 150,
  text = "Loading",
  color = "var(--black)",
  isFullPage = false,
}) => {
  return (
    <LoaderComponentStyled isFullPage={isFullPage}>
      <div>
        <Loader size={size} color={color} />
      </div>
    </LoaderComponentStyled>
  );
};

export default LoaderComponent;
