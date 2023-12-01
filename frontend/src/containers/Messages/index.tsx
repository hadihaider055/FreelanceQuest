import ChatList from "@/containers/ChatList";
import ChatBox from "../ChatBox";

const MessagesContainer = () => {
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
                    <ChatList />
                </div>
                <div>
                    <ChatBox />
                </div>
            </div>
        </>
    );
}

export default MessagesContainer;
