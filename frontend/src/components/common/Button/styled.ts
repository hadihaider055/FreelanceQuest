import styled from "styled-components";

type ButtonStyledProps = {
  variant:
    | "green"
    | "transparent"
    | "white"
    | "blue"
    | "white-blue"
    | "dark-blue"
    | "black"
    | "blue-dark"
    | "grey-transparent"
    | "grey";
  size: "sm" | "md";
};

const generateButton = (variant: string) => {
  switch (variant) {
    case "green":
      return `
        background: var(--green-dark) 0% 0% no-repeat padding-box;
        border:none;
        font-weight: 500;
        color: var(--blue-mag);
      `;
      break;

    case "white":
      return `
        background: var(--white) 0% 0% no-repeat padding-box;
        border:none;
        font-weight: 500;
        color: var(--black60);
        `;

    case "white-blue":
      return `
        background: var(--white) 0% 0% no-repeat padding-box;
        border:none;
        font-weight: 500;
        color: var(--blue20);
        `;

    case "blue":
      return `
        background: var(--blue20) 0% 0% no-repeat padding-box;
        border:none;
        color: var(--white);
        `;

    case "dark-blue":
      return `
        background: var(--blue) 0% 0% no-repeat padding-box;
        border:none;
        color: var(--white);
        `;

    case "transparent":
      return `
        border: 1px solid var(--green-dark);
        background: transparent;
        font-weight: 500;
        color: var(--green-dark);
        `;

    case "black":
      return `
        border: 1px solid #333;
        background: #333;
        font-weight: 500;
        color: var(--white);
        `;

    case "blue-dark":
      return `
        background: var(--blue-dark) 0% 0% no-repeat padding-box;
        border:none;
        color: var(--white);
        `;

    case "grey-transparent":
      return `
        border: 1px solid #384D6C;
        color: #384D6C;
        background: var(--white);
        font-weight: 700;
        font-size: 16px;
        `;

    case "grey":
      return `
        color: var(--white);
        background: #384D6C;
        font-weight: 700;
        font-size: 16px;
        `;

    default:
      return `
        background: var(--white) 0% 0% no-repeat padding-box;
        `;
  }
};

const generateHoverStyling = (variant: string) => {
  switch (variant) {
    case "green":
      return `
      opacity: 0.7;
      `;
      break;

    case "white":
      return `
        color: var(--white);
        background: var(--blue-dark);
        `;

    case "white-blue":
      return `
        color: var(--white);
        background: var(--blue-dark);
        `;

    case "transparent":
      return `
        border: 1px solid var(--green-dark);
        color: var(--blue-mag);
        background: var(--green-dark);
      `;

    case "blue":
      return `
        background: var(--blue20) 0% 0% no-repeat padding-box;
        border:none;
        color: var(--white);
        `;

    case "dark-blue":
      return `
            background: var(--blue20) 0% 0% no-repeat padding-box;
            border:none;
            color: var(--white);
            `;

    case "black":
      return `
        border: 1px solid #424242;
        color: var(--white);
        background: #424242;
      `;

    case "blue-dark":
      return `
        background: var(--blue) 0% 0% no-repeat padding-box;
        border:none;
        color: var(--white);
        `;

    case "grey-transparent":
      return `
      color: var(--white);
      background: #384D6C;
      font-weight: 700;
      font-size: 16px;
        `;

    case "grey":
      return `
      color: var(--white);
      background: #415778;
      font-weight: 700;
      font-size: 16px; 
        `;

    default:
      return `
        background: var(--white) 0% 0% no-repeat padding-box;
        `;
  }
};

export const ButtonStyled = styled.button<ButtonStyledProps>`
  cursor: pointer;
  position: relative;
  transition: ease-out all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ size }) => (size === "sm" ? "12px 19px" : "16px 32px")};
  font-size: ${({ size }) => (size === "sm" ? "14px" : "16px")};
  border-radius: 10px;
  gap: 8px;
  width: 100%;

  ${(p) => generateButton(p.variant)};

  &:hover:not(&:disabled) {
    ${(p) => generateHoverStyling(p.variant)};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.8;
  }
`;

export const ButtonIcon = styled.i`
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ButtonIconImage = styled.img``;

export const ButtonText = styled.span``;
