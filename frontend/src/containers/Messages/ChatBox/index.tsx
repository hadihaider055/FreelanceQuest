// @ts-ignore
// @ts-nocheck

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

  return (
    <>
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
            <SendMessageInputStyled
              onKeyDown={(e) => {
                if (e.key == "Enter") {
                  sendMessage(
                    activeChat.recipient_member_id,
                    e.target.value,
                    activeChat.chat_id
                  );
                  e.target.value = "";
                }
              }}
              placeholder="Type a message"
            />
          </div>
        </>
      )}
    </>
  );
};

export default ChatBox;
