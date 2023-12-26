import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Types
import { Chat, Message } from "../../types/chat";

type ChatState = {
  chats: Array<Chat> | [],
  activeChat: Chat | null,
  activeChatMessages: Array<Message> | null
};

const initialState: ChatState = {
  chats: [],
  activeChat: null,
  activeChatMessages: null
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setUserChats: (state, { payload }: PayloadAction<Array<Chat>>) => {
      state.chats = payload;
    },
    setActiveChat: (state, { payload }: PayloadAction<Chat>) => {
      state.activeChat = payload;
    },
    setActiveChatMessages: (state, { payload }: PayloadAction<Array<Message>>) => {
      state.activeChatMessages = payload;
    },
  },
});

export default chatSlice.reducer;

export const { setUserChats, setActiveChat, setActiveChatMessages } = chatSlice.actions;
