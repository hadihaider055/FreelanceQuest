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
  async (args: GetAllJobsThunkArgs, { dispatch, getState }) => {
    const state = getState() as RootState;

    if (!state.auth.user) {
      throw new Error("User not found");
    }

    try {
      const res = await axiosInstances.default.get(
        Paths.default.GET_ALL_JOBS(args?.featured || null),
        {
          headers: {
            Authorization: `Bearer ${state.auth?.token}`,
          },
        }
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

type getUserJobFeedThunkArgs = {
  user: string;
};

export const getUserJobFeedThunk = createAsyncThunk(
  "job/get/user-feed",
  async (args: getUserJobFeedThunkArgs, { dispatch, getState }) => {
    const state = getState() as RootState;

    if (!state.auth.user) {
      throw new Error("User not found");
    }

    try {
      const res = await axiosInstances.default.get(
        Paths.default.GET_USER_JOBS_FEED(args.user),
        {
          headers: {
            Authorization: `Bearer ${state.auth?.token}`,
          },
        }
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

export const getJobByIdThunk = createAsyncThunk(
  "job/get-by-id",
  async (id: string, { dispatch, getState }) => {
    const state = getState() as RootState;

    if (!state.auth.user) {
      throw new Error("User not found");
    }

    try {
      const res = await axiosInstances.default.get(
        Paths.default.GET_JOB_BY_ID(id),
        {
          headers: {
            Authorization: `Bearer ${state.auth?.token}`,
          },
        }
      );
      const job = res.data.payload.job;
      return job;
    } catch (e: any) {
      console.log(e);
      let errorMessage = e.message || "Failed to fetch job";
      if (e?.response?.data?.message) {
        errorMessage = e.response.data.message;
        Swal.fire("", `<p>${errorMessage}</p>`, "error");
      }

      throw new Error(errorMessage);
    }
  }
);

type CreateJobThunkArgs = {
  title: string;
  description: string;
  price: string;
  category: string;
  skills: string[];
  type: string;
  featured: boolean;
};

export const createJobThunk = createAsyncThunk(
  "job/create",
  async (args: CreateJobThunkArgs, { dispatch, getState }) => {
    const state = getState() as RootState;
    if (!state.auth.user) {
      throw new Error("No user found");
    }

    try {
      const res = await axiosInstances.default.post(
        Paths.default.CREATE_JOB,
        {
          ...args,
          posted_by: state.auth.user.id,
        },
        {
          headers: {
            Authorization: `Bearer ${state.auth?.token}`,
          },
        }
      );

      return res.data;
    } catch (e: any) {
      console.log(e);
      let errorMessage = e.message || "Failed to fetch job";
      if (e?.response?.data?.message) {
        errorMessage = e.response.data.message;
        Swal.fire("", `<p>${errorMessage}</p>`, "error");
      }

      throw new Error(errorMessage);
    }
  }
);
