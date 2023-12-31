import styled from "styled-components";

interface TabsStyledProps {
  activeTabsBg?: boolean;
  marginRight?: number;
}

export const TabsStyled = styled.ul<TabsStyledProps>`
  display: flex;
  align-items: center;
  list-style: none;

  li {
    &:not(:last-child) {
      margin-right: ${(p) => p.marginRight}px;
    }

    .items-center {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 64px;
      padding: 30px;

      svg {
        margin-right: 6px;
      }
    }

    button {
      border-radius: 10px;
      padding: 8px 15px;
      color: var(--grey20);
    }

    &.spacer {
      margin-right: 0px;
      flex: 1;
    }

    &.active {
      button {
        color: ${(p) => (p.activeTabsBg ? "#fff" : "")};
        background-color: ${(p) => (p.activeTabsBg ? "#333" : "")};
      }
    }

    .flex {
      display: flex;
      align-items: center;
    }
  }
`;
