// Redux
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "..";

// Axios
import axios, { AxiosError } from "axios";

// Swal
import Swal from "sweetalert2";

// Cookies Next
import axiosInstances from "@/config/axios";
import { Paths } from "@/config/Paths";

type updateProfilePictureThunkArgs = {
  userId: string;
  profile_image: File;
};

export const updateProfilePictureThunk = createAsyncThunk(
  "auth/signup",
  async (args: updateProfilePictureThunkArgs, { dispatch }) => {
    try {
      const formData = new FormData();

      formData.append("user_id", args.userId);
      formData.append("profile_image", args.profile_image);

      const user = await axiosInstances.default.post(
        Paths.default.UPDATE_PROFILE_PICTURE,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const data = user.data.payload.user;

      //   Swal.fire("Success", "Profile picture updated successfuly", "success");
      return data;
    } catch (e: any) {
      console.log(e);
      let errorMessage = e.message || "Failed to update profile picture";
      if (e?.response?.data?.message) {
        errorMessage = e.response.data.message;
        Swal.fire("", `<p>${errorMessage}</p>`, "error");
      }

      throw new Error(errorMessage);
    }
  }
);
