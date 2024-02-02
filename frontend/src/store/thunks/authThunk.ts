// Next Auth
import { signIn, signOut } from "next-auth/react";

// Redux
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "..";

// Axios
import axios, { AxiosError } from "axios";

// Swal
import Swal from "sweetalert2";

// Utils
import axiosInstances from "@/config/axios";
import { Paths } from "@/config/Paths";

// Types
import { UserRoleEnum } from "@/types/user";

type LoginThunkArgs = {
  email: string;
  password: string;
  rememberMe: boolean;
};
export const loginThunk = createAsyncThunk(
  "auth/login",
  async (args: LoginThunkArgs, { getState, dispatch }) => {
    try {
      const user = await signIn("credentials", {
        redirect: false,
        email: args.email,
        password: args.password,
        remember: args.rememberMe,
        callback: "/account/profile",
      });

      if (user?.error && !user?.ok) {
        Swal.fire("", `<p>${user?.error}</p>`, "error");
      }

      return user;
    } catch (e: any) {
      console.log("error", e);
      let errorMessage = e.message || "Failed to login";
      if (e?.response?.data?.message) {
        errorMessage = e.response.data.message;
        Swal.fire("", `<p>${errorMessage}</p>`, "error");
      }

      throw new Error(errorMessage);
    }
  }
);

type SignupArgs = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: UserRoleEnum;
};
export const signupThunk = createAsyncThunk(
  "auth/signup",
  async (args: SignupArgs, { getState, dispatch }) => {
    try {
      const user = await axiosInstances.default.post(
        Paths.default.SIGNUP,
        args
      );

      await signIn("credentials", {
        redirect: false,
        email: args.email,
        password: args.password,
        remember: true,
        callback: "/account/profile",
      });

      return user;
    } catch (e: any) {
      console.log("error", e);
      let errorMessage = e.message || "Failed to login";
      if (e?.response?.data?.message) {
        errorMessage = e.response.data.message;
        Swal.fire("", `<p>${errorMessage}</p>`, "error");
      }

      throw new Error(errorMessage);
    }
  }
);

export const logoutThunk = createAsyncThunk(
  "auth/logout",
  async (_, { getState, dispatch }) => {
    try {
      await signOut({
        redirect: false,
        callbackUrl: "/",
      });
    } catch (e) {
      throw new Error("");
    }
  }
);

type updateProfilePictureThunkArgs = {
  userId: string;
  profile_image: File;
};

export const updateProfilePictureThunk = createAsyncThunk(
  "auth/update/profile-picture",
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

type DeleteProfilePictureThunkArgs = {
  userId: string;
};

export const deleteProfilePictureThunk = createAsyncThunk(
  "auth/delete/profile-picture",
  async (args: DeleteProfilePictureThunkArgs, { dispatch }) => {
    try {
      const user = await axiosInstances.default.delete(
        Paths.default.DELETE_PROFILE_PICTURE(args.userId)
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

type UpdateUserProfileThunkArgs = {
  title: string;
  description: string;
  hourlyRate: number;
  category: string;
  languages: string[];
  skills: string[];
};

export const updateUserProfileThunk = createAsyncThunk(
  "auth/update/user-profile",
  async (args: UpdateUserProfileThunkArgs, { dispatch, getState }) => {
    const state = getState() as RootState;

    if (!state.auth.user) {
      throw new Error("User not found");
    }

    try {
      const user = await axiosInstances.default.patch(
        Paths.default.UPDATE_PROFILE(state.auth.user.id),
        args,
        {
          headers: {
            Authorization: `Bearer ${state.auth?.token}`,
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
