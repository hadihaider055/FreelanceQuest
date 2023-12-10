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

const ChatBox = () => {
    const username = "ubaidrmn"

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
        <div style={{
            backgroundColor: "white",
            padding: "50px",
            height: "100%",
            display: "flex",
            flexDirection: "column",
        }}>
            <ChatHistoryContainer>
                {messageHistory.map(message => 
                    message.sender == username ? 
                        <SentMessageBoxStyled align={"right"}>
                            <div className="main-container"><div className="message-box">{message.text}</div></div>
                        </SentMessageBoxStyled>
                    : <ReceivedMessageBoxStyled>{message.text}</ReceivedMessageBoxStyled>
                )}
            </ChatHistoryContainer>
            <SendMessageInputStyled placeholder="Type a message" />
        </div>
    </>
}

export default ChatBox;
