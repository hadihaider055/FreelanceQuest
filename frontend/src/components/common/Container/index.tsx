// Styled
import { ContainerStyled } from "./styled";

export type Size = "xl" | "lg" | "md" | "md-2" | "sm" | "xs" | "mdsm";

type ContainerProps = {
  size?: Size;
  padding?: number;
  backgroundColor?: string;
  children: React.ReactNode;
};

const Container: React.FC<ContainerProps> = ({
  children,
  size = "md",
  padding = 36,
  backgroundColor = "unset",
}) => {
  return (
    <ContainerStyled
      size={size}
      padding={padding}
      backgroundColor={backgroundColor}
    >
      <div className="cont">{children}</div>
    </ContainerStyled>
  );
};

export default Container;
