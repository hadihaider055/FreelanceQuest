import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Types
import { Chat } from "../../types/chat";

type ChatState = {
  chats: Array<Chat> | [],
};

const initialState: ChatState = {
  chats: [],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setUserChats: (state, { payload }: PayloadAction<Array<Chat>>) => {
      state.chats = payload;
    },
  },
});

export default chatSlice.reducer;

export const { setUserChats } = chatSlice.actions;
