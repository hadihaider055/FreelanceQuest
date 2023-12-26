// @ts-ignore
// @ts-nocheck

import { fetchChatMessages } from "@/store/thunks/chatThunk";
import { useAppDispatch, useAppSelector } from "@/utils/hooks/store";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { styled } from "styled-components"

const SentMessageBoxStyled = styled.div<{align: string}>`
    div.main-container {
        max-width: 100%;
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: ${props => props.align};
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

const SendMessageInputStyled = styled.input`
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

const ChatHistoryContainer = styled.div`
    overflow-y: scroll;
    max-height: 80vh;
    margin-bottom: 30px;
    @media (max-height: 690px) {
        max-height: 70vh;
    }
`;

const ReceivedMessageBoxStyled = styled.div`
    background-color: #f2f2f2;
    color: black;
    max-width: 300px;
    border-radius: 10px;
    width: 100%;
    padding: 15px;
    box-sizing: border-box;
    margin-bottom: 15px;
`;

const ChatBox = (props) => {

    const { sendMessage } = props;

    const dispatch = useAppDispatch();
    const activeChat = useAppSelector(state => state.chat.activeChat);
    const activeChatMessages = useAppSelector(state => state.chat.activeChatMessages);
    const session = useSession();

    const scrollToBottomOfChat = () => {
        try {
            const messageHistoryContainer = document.getElementById("chat-history-container")
            messageHistoryContainer.scrollTop = messageHistoryContainer.scrollHeight;
        } catch (e) {}
    }

    useEffect(() => {
        scrollToBottomOfChat();
    }, [activeChatMessages])

    useEffect(() => {
        console.log(activeChat);
        if (activeChat) {
            dispatch(fetchChatMessages(activeChat.chat_id));
        }
    }, [activeChat])

    return <>
        { activeChat && 
            <>
            <div style={{
                backgroundColor: "white",
                padding: "50px",
                height: "100%",
                display: "flex",
                flexDirection: "column",
            }}>
                <ChatHistoryContainer id="chat-history-container">
                    {activeChatMessages && session.data && activeChatMessages.map(message => 
                        message.sender_id == session?.data?.user.id ? 
                            <SentMessageBoxStyled align={"right"}>
                                <div className="main-container"><div className="message-box">{message.message}</div></div>
                            </SentMessageBoxStyled>
                        : <ReceivedMessageBoxStyled>{message.message}</ReceivedMessageBoxStyled>
                    )}
                </ChatHistoryContainer>
                <SendMessageInputStyled onKeyDown={(e) => {
                    if (e.key == 'Enter') {
                        sendMessage(activeChat.recipient_member_id, e.target.value, activeChat.chat_id)
                        e.target.value = "";
                    }
                }} placeholder="Type a message" />
            </div>
            </>
        }
    </>
}

export default ChatBox;
