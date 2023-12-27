// @ts-nocheck

import ChatList from "@/containers/ChatList";
import ChatBox from "../ChatBox";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/utils/hooks/store";
import { useSession } from "next-auth/react";
import { fetchUserChats, postMessage } from "@/store/thunks/chatThunk";
import { setActiveChatMessages } from "@/store/slices/chatSlice";

let Peer = null;
if (typeof navigator !== "undefined") {
  Peer = require("peerjs").default;
}

const MessagesContainer = () => {
  // utils
  const session = useSession();
  const dispatch = useAppDispatch();

  // chats data
  const activeChatMessages = useAppSelector(
    (state) => state.chat.activeChatMessages
  );
  const activeChat = useAppSelector((state) => state.chat.activeChat);
  const userChats = useAppSelector((state) => state.chat.chats);
  const [incomingMessage, setIncomingMessage] = useState(null);

  // peer info
  const [peerId, setPeerId] = useState(null);
  const [peer, setPeer] = useState(null);

  // peer connections
  const [connections, setConnections] = useState({});

  // websockets conn
  const [signalingChannel, setSignalingChannel] = useState(null);
  const [signalingChannelRunning, setSignalingChannelRunning] = useState(false);

  useEffect(() => {
    if (incomingMessage) {
      if (
        activeChatMessages &&
        activeChat &&
        incomingMessage.sender_id == activeChat.recipient_member_id
      ) {
        dispatch(
          setActiveChatMessages([
            ...activeChatMessages,
            {
              message: incomingMessage.message,
              sender_id: incomingMessage.sender_id,
            },
          ])
        );
      }
      setIncomingMessage(null);
    }
  }, [incomingMessage]);

  useEffect(() => {
    setInterval(broadcastPeerIdToAllChats, 5000);

    const peer = new Peer("", {
      host: "localhost",
      port: 9000,
      secure: false,
    });

    peer.on("open", function (id) {
      setPeerId(id);
    });

    peer.on("connection", (conn) => {
      conn.on("data", (data) => {
        data = JSON.parse(data);

        if (data.message) {
          receiveMessage(data);
        }

        if (data.connectionOpened) {
          if (
            !Object.keys(connections).includes(data.userId) ||
            !connections[data.userId]
          ) {
            conn.on("close", () => {
              const newConnections = { ...connections };
              newConnections[data.userId] = null;
              setConnections(newConnections);
            });
            const newConnections = { ...connections };
            newConnections[data.userId] = conn;
            setConnections(newConnections);
          }
        }

        console.log(data);
      });
    });

    setPeer(peer);
  }, []);

  const connectToPeer = (peerId, userId) => {
    console.log(`connecting to peer: ${peerId}`);
    const conn = peer.connect(peerId);

    conn.on("data", (data) => {
      data = JSON.parse(data);

      if (data.message) {
        receiveMessage(data);
      }
    });

    conn.on("open", () => {
      conn.send(
        JSON.stringify({
          userId: session.data?.user.id,
          connectionOpened: true,
        })
      );
      setConnections((conns) => ({ ...conns, [userId]: conn }));
    });

    conn.on("close", () => {
      setConnections((conns) => ({ ...conns, [userId]: null }));
    });
  };

  const loadChats = async () => {
    if (session.data) {
      await dispatch(fetchUserChats(session.data.user.id));
    }
  };

  useEffect(() => {
    if (session.status == "authenticated") {
      loadChats();
    }
  }, [session]);

  const checkSignalingChannelRunning = () => {
    if (signalingChannel) {
      if (signalingChannel.readyState === WebSocket.OPEN) {
        setSignalingChannelRunning(true);
      } else {
        setSignalingChannelRunning(false);
        setTimeout(checkSignalingChannelRunning, 2000);
      }
    }
  };

  const receiveMessage = (data) => {
    setIncomingMessage(data);
  };

  const sendMessage = (userId, message, chat_id) => {
    if (connections[userId]) {
      connections[userId].send(
        JSON.stringify({ sender_id: session.data.user.id, message: message })
      );
    }

    dispatch(
      postMessage({
        sender_id: session.data.user.id,
        chat_id: chat_id,
        message: message,
      })
    );

    dispatch(
      setActiveChatMessages([
        ...activeChatMessages,
        { sender_id: session.data.user.id, message: message },
      ])
    );
  };

  useEffect(() => {
    if (session.data?.user.id) {
      const signalingChannel = new WebSocket(
        `ws://localhost:8001/api/v1/chat/signaling/${session.data?.user.id}/`
      );

      signalingChannel.addEventListener("message", (e) => {
        const message = JSON.parse(e.data);

        if (message.peerId && message.userId) {
          connectToPeer(message.peerId, message.userId);
        }
      });

      signalingChannel.onclose = (e) => {
        setSignalingChannelRunning(false);
        checkSignalingChannelRunning();
      };

      setSignalingChannel(signalingChannel);

      checkSignalingChannelRunning();
    }
  }, [session]);

  const broadcastPeerIdToAllChats = () => {
    try {
      if (
        userChats &&
        peerId &&
        signalingChannel &&
        signalingChannelRunning &&
        session.data?.user.id
      ) {
        userChats.forEach((chat) => {
          if (
            !Object.keys(connections).includes(chat.recipient_member_id) ||
            !connections[chat.recipient_member_id]
          ) {
            const data = {
              receiver_id: chat.recipient_member_id,
              data: {
                peerId: peerId,
                userId: session.data.user.id,
              },
            };
            console.log(`sending peer id to ${chat.recipient_member_id}`);
            signalingChannel.send(JSON.stringify(data));
          }
        });
      }
    } catch (err) {
      checkSignalingChannelRunning();
    }
  };

  useEffect(() => {
    broadcastPeerIdToAllChats();
  }, [userChats, peerId, signalingChannel, signalingChannelRunning, session]);

  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "0.25fr 0.75fr",
          height: "100%",
          maxHeight: "100%",
          position: "fixed",
          overflowY: "hidden",
          maxWidth: "100%",
          width: "100%",
        }}
      >
        <div
          style={{
            height: "100%",
            maxHeight: "100%",
          }}
        >
          <ChatList connections={connections} />
        </div>
        <div>
          <ChatBox sendMessage={sendMessage} />
        </div>
      </div>
    </>
  );
};

export default MessagesContainer;
