import styled from "styled-components";

type InputStyledProps = {
  mb: number;
  preInputText?: string | React.ReactNode;
  postInputText?: string | React.ReactNode;
  lowercase?: boolean;
  disabled?: boolean;
};
export const InputStyled = styled.div<InputStyledProps>`
  margin-bottom: ${(p) => p.mb}px;
  position: relative;

  .input-container {
    width: 100%;
    height: 100%;
    border: 1px solid #d9d9d9;
    border-radius: 10px;
    overflow: hidden;
    outline: none;

    .input {
      padding: 19px 24px;
      outline: none;
      border: none;
      width: 100%;
      height: 100%;

      &::placeholder {
        color: #9dafbd;
      }

      ${(p) =>
        p.disabled &&
        `
          background-color: var(--grey-light);
          cursor: not-allowed;
          transition: 0.2s all ease-in-out;
        `}
    }
  }
`;
