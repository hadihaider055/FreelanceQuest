// @ts-ignore
// @ts-nocheck

// React Icons
import { LuSend } from "react-icons/lu";

import { fetchChatMessages } from "@/store/thunks/chatThunk";
import { useAppDispatch, useAppSelector } from "@/utils/hooks/store";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import {
  ChatHistoryContainer,
  ReceivedMessageBoxStyled,
  SendMessageInputStyled,
  SentMessageBoxStyled,
} from "./styled";

const ChatBox = (props) => {
  const { sendMessage } = props;

  const dispatch = useAppDispatch();
  const activeChat = useAppSelector((state) => state.chat.activeChat);
  const activeChatMessages = useAppSelector(
    (state) => state.chat.activeChatMessages
  );
  const session = useSession();

  const [message, setMessage] = useState("");

  const scrollToBottomOfChat = () => {
    try {
      const messageHistoryContainer = document.getElementById(
        "chat-history-container"
      );
      messageHistoryContainer.scrollTop = messageHistoryContainer.scrollHeight;
    } catch (e) {}
  };

  useEffect(() => {
    scrollToBottomOfChat();
  }, [activeChatMessages]);

  useEffect(() => {
    console.log(activeChat);
    if (activeChat) {
      dispatch(fetchChatMessages(activeChat.chat_id));
    }
  }, [activeChat]);

  const handleSendMessage = () => {
    if (message.trim() == "") return;

    if (!message) return;

    sendMessage(activeChat.recipient_member_id, message, activeChat.chat_id);

    setMessage("");
  };

  return (
    <div className="w-full overflow-hidden relative">
      {activeChat && (
        <>
          <div
            style={{
              backgroundColor: "white",
              padding: "50px",
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
            className="font-inter text-md"
          >
            <ChatHistoryContainer id="chat-history-container">
              {activeChatMessages &&
                session.data &&
                activeChatMessages.map((message, _id) => (
                  <React.Fragment key={_id}>
                    {message.sender_id == session?.data?.user.id ? (
                      <SentMessageBoxStyled align={"right"}>
                        <div className="main-container">
                          <div className="message-box">{message.message}</div>
                        </div>
                      </SentMessageBoxStyled>
                    ) : (
                      <ReceivedMessageBoxStyled>
                        {message.message}
                      </ReceivedMessageBoxStyled>
                    )}
                  </React.Fragment>
                ))}
            </ChatHistoryContainer>

            <div className="w-full relative">
              <SendMessageInputStyled
                onKeyDown={(e) => {
                  if (e.key == "Enter") {
                    handleSendMessage();
                  }
                }}
                onChange={(e) => setMessage(e.target.value)}
                value={message}
                placeholder="Type message and press enter to send"
                className="font-inter text-md "
              />

              <span
                className="absolute right-1 top-1/2 -translate-y-1/2 bg-green-400 hover:bg-green-500 cursor-pointer p-3 rounded-xl"
                onClick={handleSendMessage}
              >
                <LuSend />
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ChatBox;
