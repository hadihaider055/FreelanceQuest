// Redux
import { createAsyncThunk } from "@reduxjs/toolkit";

// Axios
// import axios, { AxiosError } from "axios";
import axiosInstances from "@/config/axios";

// Swal
import Swal from "sweetalert2";
import { setActiveChatMessages, setUserChats } from "../slices/chatSlice";

export const fetchUserChats = createAsyncThunk(
    "chat/fetchUserChats",
    async (userId: string, { dispatch }) => {
      try {
        const chats = await axiosInstances.default.get(`/chat/user/${userId}/`);
        dispatch(setUserChats(chats.data.payload.chats))
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
    async (chatId: string, { dispatch }) => {
      try {
        const chat = await axiosInstances.default.get(`/chat/${chatId}/messages/`);
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
  async (data, { dispatch }) => {
    try {
      const message = await axiosInstances.default.post(`/message/`, JSON.stringify(data));
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
