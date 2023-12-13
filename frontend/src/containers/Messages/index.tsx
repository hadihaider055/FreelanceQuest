import ChatList from "@/containers/ChatList";
import ChatBox from "../ChatBox";
import { useState } from "react";

const MessagesContainer = () => {

    const [activeChatData, setActiveChatData] = useState(null);

    return (
        <>
            <div style={{
                display: "grid",
                gridTemplateColumns: "0.25fr 0.75fr",
                height: "100%",
                maxHeight: "100%",
                position: "fixed",
                overflowY: "hidden",
                maxWidth: "100%",
                width: "100%",
            }}>
                <div style={{
                    height: "100%",
                    maxHeight: "100%",
                }}>
                    <ChatList setActiveChatData={setActiveChatData} />
                </div>
                <div>
                    <ChatBox activeChatData={activeChatData} />
                </div>
            </div>
        </>
    );
}

export default MessagesContainer;
