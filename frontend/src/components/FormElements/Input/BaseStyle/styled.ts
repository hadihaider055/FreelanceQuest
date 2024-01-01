import styled from "styled-components";

type InputStyledProps = {
  mb: number;
  preInputText?: string | React.ReactNode;
  postInputText?: string | React.ReactNode;
  lowercase?: boolean;
  disabled?: boolean;
  type?: string;
};
export const InputStyled = styled.div<InputStyledProps>`
  margin-bottom: ${(p) => p.mb}px;
  position: relative;

  label {
    margin-bottom: 12px;
    display: flex;
    position: relative;
    align-items: center;
  }

  .input-container {
    width: 100%;
    height: 100%;
    border: ${(p) => (p.type === "radio" ? "none" : "1px solid #d9d9d9")};
    border-radius: 10px;
    overflow: hidden;
    outline: none;
    display: flex;
    align-items: center;

    input[type="radio"] {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      outline: none;
      transition: box-shadow 0.3s ease;
      border: 2px solid rgb(34 197 94);
      cursor: pointer;
    }

    input[type="radio"]:before {
      content: "";
      display: block;
      width: 60%;
      height: 60%;
      margin: 20% auto;
      border-radius: 50%;
    }

    input[type="radio"]:checked:before {
      background: rgb(34 197 94);
    }

    .input {
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
