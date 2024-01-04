// @ts-nocheck

// Utils
import { setActiveChat, setActiveChatMessages } from "@/store/slices/chatSlice";
import { useAppSelector } from "@/utils/hooks/store";
import { useAppDispatch } from "@/utils/hooks/store";

// Styled
import { InputStyled, StyledChatListRow } from "./styled";
import { useRouter } from "next/router";
import { useEffect } from "react";

const ChatList = (props) => {
  const { connections } = props;

  const userChats = useAppSelector((state) => state.chat.chats);
  const { user } = useAppSelector((state) => state.auth);
  const activeChat = useAppSelector((state) => state.chat.activeChat);
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    if (router.query?.chatId) {
      const chatId = router.query.chatId
      if (
        !activeChat ||
        (activeChat && activeChat.chat_id != chatId)
      ) {
        let _chat = null;
        userChats.forEach(chat => {
          if (chatId == chat.chat_id) {
            _chat = chat
          }
        })

        if (_chat) {
          dispatch(setActiveChat(_chat));
          dispatch(setActiveChatMessages(null));
        }
      }
    }
  }, [router.query, userChats])

  return (
    <div
      style={{
        height: "100%",
        maxHeight: "100%",
        maxWidth: "100%",
        width: "100%",
        backgroundColor: "#f2f2f2",
      }}
      className="font-inter"
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
                delete router.query;
                router.push({ query: {...router.query, chatId: chat.chat_id} }, undefined, { shallow: true})
              }
            }}
            className={`flex duration-700 transition-all ease-in-out ${
              activeChat ? "active shadow-lg" : ""
            }`}
          >
            <img
              style={{
                width: "50px",
                height: "50px",
                marginRight: "20px",
                borderRadius: "100%",
              }}
              src={user?.profileImage}
            />
            <div className="flex-col">
              <p className="text-xl text-green-500">{chat.recipient_name}</p>
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
