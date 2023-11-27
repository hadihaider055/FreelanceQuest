import ChatList from "@/containers/ChatList";

const MessagesContainer = () => {
    return (
        <>
            <div className="grid grid-cols-3 gap-3">
                <div>
                    <ChatList />
                </div>
                <div>09</div>
                <div>09</div>
            </div>
        </>
    );
}

export default MessagesContainer;
