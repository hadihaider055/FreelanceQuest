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

type GetAllJobsThunkArgs = {
  featured?: boolean;
};

export const getAllJobsThunk = createAsyncThunk(
  "job/get-all",
  async (args: GetAllJobsThunkArgs, { dispatch }) => {
    try {
      const res = await axiosInstances.default.get(
        Paths.default.GET_ALL_JOBS(args?.featured || false)
      );

      const jobs = res.data.payload.jobs;

      return jobs;
    } catch (e: any) {
      console.log(e);
      let errorMessage = e.message || "Failed to signup";
      if (e?.response?.data?.message) {
        errorMessage = e.response.data.message;
        Swal.fire("", `<p>${errorMessage}</p>`, "error");
      }

      throw new Error(errorMessage);
    }
  }
);
