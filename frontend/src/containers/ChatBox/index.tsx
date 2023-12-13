// @ts-ignore
// @ts-nocheck

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
        background-color: var(--green-dark);
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
    background-color: #dbd9d9;
    color: black;
    max-width: 300px;
    border-radius: 10px;
    width: 100%;
    padding: 15px;
    box-sizing: border-box;
`;

const ChatBox = (props) => {
    const { activeChatData } = props;
    const session = useSession();
    const [signalingChannel, setSignalingChannel] = useState(null);

    useEffect(() => {
        if (session.data?.user.id) {
            const signalingChannel = new WebSocket(`ws://localhost:8001/api/v1/chat/signaling/${session.data?.user.id}/`);
    
            signalingChannel.addEventListener("message", message => {
                console.log(JSON.parse(message.data));
            })
        
            signalingChannel.onopen = () => {
                console.log("websocket connection established")
            }
    
            setSignalingChannel(signalingChannel);
        }
    }, [session])

    // async function makeCall() {
    //     const configuration = {'iceServers': [{'urls': 'stun:stun.l.google.com:19302'}]}
    //     const peerConnection = new RTCPeerConnection(configuration);
    //     signalingChannel.addEventListener('message', async message => {
    //         if (message.answer) {
    //             const remoteDesc = new RTCSessionDescription(message.answer);
    //             await peerConnection.setRemoteDescription(remoteDesc);
    //         }
    //     });
    //     const offer = await peerConnection.createOffer();
    //     await peerConnection.setLocalDescription(offer);
    //     signalingChannel.send({receiver_id: activeChatData.recipient_member_id, data: {'offer': offer}});
    // }

    // signalingChannel.addEventListener('message', async message => {
    //     if (message.offer) {
    //         peerConnection.setRemoteDescription(new RTCSessionDescription(message.offer));
    //         const answer = await peerConnection.createAnswer();
    //         await peerConnection.setLocalDescription(answer);
    //         signalingChannel.send({'answer': answer});
    //     }
    // });

    const sendMessage = (msg) => {
        if (signalingChannel && signalingChannel.OPEN && activeChatData != null) {
            console.log("SENDING MESSAGE: " + msg)
            signalingChannel.send(JSON.stringify({receiver_id: activeChatData.recipient_member_id, data: {'message': msg}}))
        }
    }

    const messageHistory = [
        {sender: "taha_zuberi", text: "Hello how are you doing!"},
        {sender: "ubaidrmn", text: "Hello whatz upzzz ggg"},
        {sender: "taha_zuberi", text: "Hello how are you doing!"},
        {sender: "ubaidrmn", text: "Hello whatz upzzz ggg"},
        {sender: "taha_zuberi", text: "Hello how are you doing!"},
        {sender: "ubaidrmn", text: "Hello whatz upzzz ggg"},
        {sender: "taha_zuberi", text: "Hello how are you doing!"},
        {sender: "ubaidrmn", text: "Hello whatz upzzz ggg"},
        {sender: "ubaidrmn", text: "Hello whatz upzzz ggg"},
        {sender: "ubaidrmn", text: "Hello whatz upzzz ggg"},
        {sender: "taha_zuberi", text: "Hello how are you doing!"},
        {sender: "ubaidrmn", text: "Hello whatz upzzz ggg"},
        {sender: "taha_zuberi", text: "Hello how are you doing!"},
        {sender: "ubaidrmn", text: "Hello whatz upzzz ggg"},
        {sender: "taha_zuberi", text: "Hello how are you doing!"},

    ]

    return <>
        { activeChatData && 
            <div style={{
                backgroundColor: "white",
                padding: "50px",
                height: "100%",
                display: "flex",
                flexDirection: "column",
            }}>
                <ChatHistoryContainer>
                    {messageHistory.map(message => 
                        message.sender == "ubaidrmn" ? 
                            <SentMessageBoxStyled align={"right"}>
                                <div className="main-container"><div className="message-box">{message.text}</div></div>
                            </SentMessageBoxStyled>
                        : <ReceivedMessageBoxStyled>{message.text}</ReceivedMessageBoxStyled>
                    )}
                </ChatHistoryContainer>
                <SendMessageInputStyled onKeyDown={(e) => {
                    if (e.key == 'Enter') {
                        sendMessage(e.target.value)
                    }
                }} placeholder="Type a message" />
            </div>
        }
    </>
}

export default ChatBox;
