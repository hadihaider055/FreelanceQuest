import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Thunks
import {
  freelancerSignupThunk,
  loginThunk,
  logoutThunk,
} from "../thunks/authThunk";

// Utils
import { ActionTracker, initialActionTracker } from "../utils";

// Types
import { User } from "../../types/user";
import { getAllJobsThunk } from "../thunks/jobThunk";

type AuthState = {
  getAllJobs: ActionTracker;
};

const initialState: AuthState = {
  getAllJobs: initialActionTracker,
};

const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Get all Jobs
    builder.addCase(getAllJobsThunk.pending, (state) => {
      state.getAllJobs = {
        ...initialActionTracker,
        isLoading: true,
      };
    });
    builder.addCase(getAllJobsThunk.fulfilled, (state, { payload }) => {
      state.getAllJobs = {
        ...initialActionTracker,
        isSuccess: true,
        successMessage: "Logged in successfully",
      };
    });

    builder.addCase(getAllJobsThunk.rejected, (state, { error }) => {
      state.getAllJobs = {
        ...initialActionTracker,
        errorMessage: error.message || "",
        isError: true,
      };
    });
  },
});

export default jobSlice.reducer;
export const {} = jobSlice.actions;
