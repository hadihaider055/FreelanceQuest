import styled from "styled-components";

export const SentMessageBoxStyled = styled.div<{ align: string }>`
  div.main-container {
    max-width: 100%;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: ${(props) => props.align};
  }

  div.message-box {
    background-color: rgb(34 197 94);
    color: white;
    max-width: 300px;
    width: 100%;
    border-radius: 10px;
    padding: 15px;
    margin-bottom: 15px;
  }
`;

export const SendMessageInputStyled = styled.input`
  border: 1px solid #d9d9d9;
  max-width: 100%;
  bottom: 30px;
  width: 100%;
  padding: 15px;
  border-radius: 10px;
  outline: none;
  box-sizing: border-box;
  height: 50px;
  &::placeholder {
    color: #9dafbd;
  }
`;

export const ChatHistoryContainer = styled.div`
  overflow-y: scroll;
  max-height: 80vh;
  margin-bottom: 30px;
  @media (max-height: 690px) {
    max-height: 70vh;
  }
`;

export const ReceivedMessageBoxStyled = styled.div`
  background-color: #f2f2f2;
  color: black;
  max-width: 300px;
  border-radius: 10px;
  width: 100%;
  padding: 15px;
  box-sizing: border-box;
  margin-bottom: 15px;
`;
