// Redux
import { createAsyncThunk } from "@reduxjs/toolkit";

// Axios
// import axios, { AxiosError } from "axios";
import axiosInstances from "@/config/axios";

// Swal
import Swal from "sweetalert2";
import { setUserChats } from "../slices/chatSlice";

export const fetchUserChats = createAsyncThunk(
    "chat/fetchUserChats",
    async (userId: string, { dispatch }) => {
      try {
        const chats = await axiosInstances.default.get(`/chat/user/${userId}`);
        dispatch(setUserChats(chats.data.payload))
        // Swal.fire("Success", user.data.message, "success");
        return chats;
      } catch (e: any) {
        console.log(e);
        let errorMessage = e.message || "Failed to fetch chats";
        if (e?.response?.data?.message) {
          errorMessage = e.response.data.message;
          Swal.fire("", `<p>${errorMessage}</p>`, "error");
        }
  
        throw new Error(errorMessage);
      }
    }
  );