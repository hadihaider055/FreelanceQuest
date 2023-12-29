// Redux
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "..";

// Axios
import axios, { AxiosError } from "axios";

// Swal
import Swal from "sweetalert2";

// Cookies Next
import { signIn, signOut } from "next-auth/react";
import axiosInstances from "@/config/axios";
import { Paths } from "@/config/Paths";

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

type FreelancerSignupArgs = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};
export const freelancerSignupThunk = createAsyncThunk(
  "auth/freelancers-signup",
  async (args: FreelancerSignupArgs, { getState, dispatch }) => {
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
