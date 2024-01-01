import styled from "styled-components";

type TextareaWrapperProps = {
  marginBottom: number;
  height: number;
  disabled: boolean;
};

export const TextareaWrapper = styled.div<TextareaWrapperProps>`
  display: flex;
  flex-direction: column;
  padding-bottom: ${(p) => p.marginBottom}px;
  position: relative;

  label {
    margin-bottom: 12px;
    display: flex;
    position: relative;
    align-items: center;

    .icon {
      height: 16px;
      width: 16px;
    }
  }

  .textarea {
    height: ${(p) => p.height}px;
    border: 1px solid #d9d9d9;
    border-radius: 10px;
    overflow: hidden;
    outline: none;
    outline: none;
    resize: none;
    width: 100%;
    pointer-events: ${(p) => (p.disabled ? "none" : "auto")};
    color: ${(p) => (p.disabled ? "rgba(0, 0, 0, 0.5)" : "#232323")};
    transition: 0.2s all ease-out;
    box-sizing: border-box;
    padding: 19px 24px;
  }

  .input-icon {
    width: 24px;
    height: 24px;
    position: absolute;
    border-radius: 50%;
    right: 0;
    top: 0;
    margin-top: 19px;
    margin-right: 22px;
  }

  .input-guide {
    font-family: "Rubik", sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0.02em;
    // font-feature-settings: 'tnum' on, 'lnum' on, 'zero' on;
    color: #8e909b;
    position: absolute;
    left: 0;
    bottom: 0;
    transform: translateY(calc(100% + 15px));
  }

  .error {
    color: var(--red);
    margin-top: 4px;
  }

  .bio-text {
    color: rgba(35, 35, 35, 0.4);
    position: absolute;
    right: 0;
    margin-top: 10px;
    bottom: 0;
  }
`;
