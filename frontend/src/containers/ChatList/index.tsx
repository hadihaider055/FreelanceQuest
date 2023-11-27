const ChatList = () => {

    const sampleChatListData = [
        {username: "ubaidrmn", displayPicture: "https://t3.ftcdn.net/jpg/05/53/79/60/360_F_553796090_XHrE6R9jwmBJUMo9HKl41hyHJ5gqt9oz.jpg", status: "online"}
    ]

    return (
        <div style={{
            maxWidth: "100%",
            width: "100%"
        }}>
            {sampleChatListData.map(user =>
                <div className="flex" style={{
                    padding: "30px",
                    paddingTop: "15px",
                    paddingBottom: "15px",
                    backgroundColor: "grey"
                }}>
                    <img style={{
                        width: "45px",
                        height: "45px",
                        marginRight: "20px",
                        borderRadius: "100%"
                    }} src={user.displayPicture} />
                    <div className="flex-col">
                        <p className="text-xl">{user.username}</p>
                        <p className="text-sm">{user.status}</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ChatList;
