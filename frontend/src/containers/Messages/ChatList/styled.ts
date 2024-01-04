import styled from "styled-components";

export const InputStyled = styled.div`
  position: relative;

  .input-container {
    width: 100%;
    height: 100%;
    border: 1px solid #d9d9d9;
    border-radius: 10px;
    overflow: hidden;
    outline: none;

    .input {
      outline: none;
      padding: 15px;
      border: none;
      width: 100%;
      height: 100%;

      &::placeholder {
        color: #9dafbd;
      }
    }
  }
`;

export const StyledChatListRow = styled.div`
  padding: 30px;
  padding-top: 20px;
  padding-bottom: 20px;
  cursor: pointer;
  transition: 0.25s;

  &:hover,
  &.active {
    background: rgb(34 197 94);
    color: var(--white);

    p {
      color: var(--white);
    }
  }
`;
