import styled from "styled-components";

type SelectWrapperProps = {
  marginBottom: number;
};

type SelectStyledProps = {
  disabled: boolean;
};

export const SelectContainerStyled = styled.div`
  label {
    margin-bottom: 12px;
    display: flex;
    position: relative;
    align-items: center;
  }
`;

export const SelectWrapper = styled.div<SelectWrapperProps>`
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
  width: 100%;
  height: 54px;
  margin-bottom: ${(p) => p.marginBottom}px;
  border-radius: 10px;
  background-color: var(--white);
  border: 1px solid #d9d9d9;

  .label {
    display: flex;
    align-items: center;
    margin-bottom: 10px;

    .text {
      display: block;
      margin-right: 5px;
      color: var(--black70);
    }
  }
  .icon {
    height: 16px;
    width: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .error {
    color: red;
    margin-top: 4px;
    text-align: right;
  }
`;

export const SelectStyled = styled.div`
  .drop-down {
    position: absolute;
    top: calc(100% + 2px);
    left: 0px;
    width: 100%;
    border-radius: 19px;
    z-index: 1;
    background-color: var(--white);
    overflow: hidden;
    border: 4px solid var(--grey-soft);
    overflow-y: scroll;
    max-height: 320px;
    padding: 10px;

    ::-webkit-scrollbar {
      width: 0.7em;
    }

    ::-webkit-scrollbar-track {
      border-radius: 20px;
    }

    ::-webkit-scrollbar-thumb {
      background-color: var(--grey-dark);
      border-radius: 20px;
    }

    .item {
      padding: 0 20px;
      cursor: pointer;
      color: #232323;
      text-align: left;
      height: 54px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      border: 4px solid var(--grey-soft);

      &:hover {
        background-color: var(--black-light);
        border: 2px solid var(--grey-soft);
        width: calc(100% + 16px);
      }
    }
  }
`;
export const SelectButtonStyled = styled.button<SelectStyledProps>`
  height: 64px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 28px;
  background-color: var(--grey-soft);
  border-radius: 19px;
  border: 4px solid var(--grey-soft);
  cursor: pointer;
  outline: none;

  pointer-events: ${(p) => (p.disabled ? "none" : "auto")};
  color: ${(p) => (p.disabled ? "rgba(0, 0, 0, 0.5)" : "#232323")};

  .icon {
    height: 26px;
    width: 26px;
  }
`;
