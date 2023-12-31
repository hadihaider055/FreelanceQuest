import styled from "styled-components";

type PulseLoadingStyledProps = {
  height: number;
  width: number | string;
  paddingBottom: number | string;
  backgroundColor: string;
};

export const PulseLoadingStyled = styled.div<PulseLoadingStyledProps>`
  background-color: ${(p) => p.backgroundColor};
  height: ${(p) => p.height}px;
  width: ${(p) => (typeof p.width === "number" ? `${p.width}px` : p.width)};
  padding-bottom: ${(p) =>
    typeof p.paddingBottom === "number"
      ? `${p.paddingBottom}px`
      : p.paddingBottom};
  border-radius: 8px;
  overflow: hidden;

  position: relative;
`;
export const PulseStyled = styled.div`
  height: 100%;
  width: 100%;
  background-image: linear-gradient(
    to right,
    rgb(255, 255, 255, 0.1),
    rgb(255, 255, 255, 0.6),
    rgb(255, 255, 255, 0.1)
  );
  position: absolute;
  top: 0px;
  left: -100%;
  animation: 1s moveRight infinite linear;

  @keyframes moveRight {
    to {
      left: 100%;
    }
  }
`;
