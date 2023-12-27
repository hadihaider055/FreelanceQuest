// @ts-nocheck

import { setActiveChat, setActiveChatMessages } from "@/store/slices/chatSlice";
import { useAppSelector } from "@/utils/hooks/store";
import { useAppDispatch } from "@/utils/hooks/store";
import { styled } from "styled-components";

const InputStyled = styled.div`
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

const StyledChatListRow = styled.div`
  padding: 30px;
  padding-top: 20px;
  padding-bottom: 20px;
  cursor: pointer;
  transition: 0.25s;
  &:hover {
    background: var(--black60);
    color: var(--white);
  }
`;

const ChatList = (props) => {
  const { connections } = props;

  const userChats = useAppSelector((state) => state.chat.chats);
  const activeChat = useAppSelector((state) => state.chat.activeChat);
  const dispatch = useAppDispatch();

  // status: "online", displayPicture: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1Fs8Arl_LnQwQ8ppF4IpZJ88JMXu4SHf7iFLcKQtUqg&s"

  return (
    <div
      style={{
        height: "100%",
        maxHeight: "100%",
        maxWidth: "100%",
        width: "100%",
        backgroundColor: "#f2f2f2",
      }}
    >
      <div
        style={{
          padding: "30px",
        }}
      >
        <p
          style={{
            fontSize: "35px",
            fontWeight: "600",
            marginBottom: "30px",
          }}
        >
          Chats
        </p>
        <InputStyled>
          <div className="input-container">
            <input className="input" placeholder="Search" />
          </div>
        </InputStyled>
      </div>
      {userChats &&
        userChats.map((chat) => (
          <StyledChatListRow
            key={chat.chat_id}
            onClick={(e) => {
              if (
                !activeChat ||
                (activeChat && activeChat.chat_id != chat.chat_id)
              ) {
                dispatch(setActiveChat(chat));
                dispatch(setActiveChatMessages(null));
              }
            }}
            className="flex"
          >
            <img
              style={{
                width: "50px",
                height: "50px",
                marginRight: "20px",
                borderRadius: "100%",
              }}
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1Fs8Arl_LnQwQ8ppF4IpZJ88JMXu4SHf7iFLcKQtUqg&s"
            />
            <div className="flex-col">
              <p className="text-xl" style={{ color: "var(--green-dark)" }}>
                {chat.recipient_name}
              </p>
              <p className="text-sm">
                {Object.keys(connections).includes(chat.recipient_member_id) &&
                connections[chat.recipient_member_id]
                  ? "online"
                  : "offline"}
              </p>
            </div>
          </StyledChatListRow>
        ))}

      {!userChats ||
        (userChats.length <= 0 && (
          <div
            style={{
              padding: "30px",
              paddingTop: "20px",
              paddingBottom: "20px",
            }}
          >
            <p>You don&apos;t have any messages yet!</p>
          </div>
        ))}
    </div>
  );
};

export default ChatList;
