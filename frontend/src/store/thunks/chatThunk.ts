// Redux
import { createAsyncThunk } from "@reduxjs/toolkit";

// Axios
// import axios, { AxiosError } from "axios";
import axiosInstances from "@/config/axios";

// Swal
import Swal from "sweetalert2";
import { setActiveChatMessages, setUserChats } from "../slices/chatSlice";

// Config
import { Paths } from "@/config/Paths";
import { RootState } from "..";

export const fetchUserChats = createAsyncThunk(
  "chat/fetchUserChats",
  async (userId: string, { dispatch, getState }) => {
    const state = getState() as RootState;

    if (!state.auth.user) {
      throw new Error("User not found");
    }
    try {
      const chats = await axiosInstances.default.get(
        Paths.default.FETCH_USER_CHAT(userId),
        {
          headers: {
            Authorization: `Bearer ${state.auth?.token}`,
          },
        }
      );
      dispatch(setUserChats(chats.data.payload.chats));
      return chats;
    } catch (e: any) {
      console.log(e);
      let errorMessage = e.message || "Failed to fetch chats";
      if (e?.response?.data?.message) {
        errorMessage = e.response.data.message;
      }

      throw new Error(errorMessage);
    }
  }
);

export const fetchChatMessages = createAsyncThunk(
  "chat/fetchChatMessages",
  async (chatId: string, { dispatch, getState }) => {
    const state = getState() as RootState;

    if (!state.auth.user) {
      throw new Error("User not found");
    }

    try {
      const chat = await axiosInstances.default.get(
        Paths.default.FETCH_CHAT_MESSAGES(chatId),
        {
          headers: {
            Authorization: `Bearer ${state.auth?.token}`,
          },
        }
      );
      dispatch(setActiveChatMessages(chat.data.payload.messages));
      return chat;
    } catch (e: any) {
      console.log(e);
      let errorMessage = e.message || "Failed to fetch chat messages";
      if (e?.response?.data?.message) {
        errorMessage = e.response.data.message;
      }

      throw new Error(errorMessage);
    }
  }
);

// to permanently store the message on backend

export const postMessage = createAsyncThunk(
  "chat/postMessage",
  async (data, { dispatch, getState }) => {
    const state = getState() as RootState;

    if (!state.auth.user) {
      throw new Error("User not found");
    }

    try {
      const message = await axiosInstances.default.post(
        Paths.default.SEND_MESSAGE,
        JSON.stringify(data),
        {
          headers: {
            Authorization: `Bearer ${state.auth?.token}`,
          },
        }
      );
      return message;
    } catch (e: any) {
      console.log(e);
      let errorMessage = e.message || "Failed to post message";
      if (e?.response?.data?.message) {
        errorMessage = e.response.data.message;
      }

      throw new Error(errorMessage);
    }
  }
);
