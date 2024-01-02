import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Thunks
import { createJobThunk, getAllJobsThunk } from "../thunks/jobThunk";

// Utils
import { ActionTracker, initialActionTracker } from "../utils";

// Types
import { User } from "../../types/user";

type AuthState = {
  getAllJobs: ActionTracker;
  createJob: ActionTracker;
};

const initialState: AuthState = {
  getAllJobs: initialActionTracker,
  createJob: initialActionTracker,
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

    // Create Job
    builder.addCase(createJobThunk.pending, (state) => {
      state.createJob = {
        ...initialActionTracker,
        isLoading: true,
      };
    });
    builder.addCase(createJobThunk.fulfilled, (state, { payload }) => {
      state.createJob = {
        ...initialActionTracker,
        isSuccess: true,
        successMessage: "Logged in successfully",
      };
    });

    builder.addCase(createJobThunk.rejected, (state, { error }) => {
      state.createJob = {
        ...initialActionTracker,
        errorMessage: error.message || "",
        isError: true,
      };
    });
  },
});

export default jobSlice.reducer;
export const {} = jobSlice.actions;
