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
import { updateProfilePictureThunk } from "../thunks/userThunk";

type AuthState = {
  login: ActionTracker;
  signup: ActionTracker;
  logout: ActionTracker;
  updateProfilePicture: ActionTracker;

  user: User | null;
};

const initialState: AuthState = {
  login: initialActionTracker,
  signup: initialActionTracker,
  logout: initialActionTracker,
  updateProfilePicture: initialActionTracker,

  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.user = null;
    },
    loginUser: (state, { payload }: PayloadAction<User>) => {
      state.user = payload;
    },
  },
  extraReducers: (builder) => {
    // Login
    builder.addCase(loginThunk.pending, (state) => {
      state.login = {
        ...initialActionTracker,
        isLoading: true,
      };
    });
    builder.addCase(loginThunk.fulfilled, (state, { payload }) => {
      state.login = {
        ...initialActionTracker,
        isSuccess: true,
        successMessage: "Logged in successfully",
      };
    });

    builder.addCase(loginThunk.rejected, (state, { error }) => {
      state.login = {
        ...initialActionTracker,
        errorMessage: error.message || "",
        isError: true,
      };
    });

    // Signup
    builder.addCase(freelancerSignupThunk.pending, (state) => {
      state.signup = {
        ...initialActionTracker,
        isLoading: true,
      };
    });
    builder.addCase(freelancerSignupThunk.fulfilled, (state, { payload }) => {
      state.signup = {
        ...initialActionTracker,
        isSuccess: true,
        successMessage: "Logged in successfully",
      };
    });

    builder.addCase(freelancerSignupThunk.rejected, (state, { error }) => {
      state.signup = {
        ...initialActionTracker,
        errorMessage: error.message || "",
        isError: true,
      };
    });

    //Logout
    builder.addCase(logoutThunk.pending, (state) => {
      state.logout = {
        ...initialActionTracker,
        isLoading: true,
      };
    });
    builder.addCase(logoutThunk.fulfilled, (state, {}) => {
      state.logout = {
        ...initialActionTracker,
        isSuccess: true,
        successMessage: "Logged out successfully",
      };
      state.user = null;
    });
    builder.addCase(logoutThunk.rejected, (state, { error }) => {
      state.logout = {
        ...initialActionTracker,
        isError: true,
        errorMessage: error.message || "",
      };
    });

    // Update Profile Picture
    builder.addCase(updateProfilePictureThunk.pending, (state) => {
      state.updateProfilePicture = {
        ...initialActionTracker,
        isLoading: true,
      };
    });
    builder.addCase(updateProfilePictureThunk.fulfilled, (state, action) => {
      state.updateProfilePicture = {
        ...initialActionTracker,
        isSuccess: true,
        successMessage: "Profile picture updated successfully",
      };

      state.user = action.payload;
    });
    builder.addCase(updateProfilePictureThunk.rejected, (state, { error }) => {
      state.updateProfilePicture = {
        ...initialActionTracker,
        isError: true,
        errorMessage: error.message || "",
      };
    });
  },
});

export default authSlice.reducer;
export const { logoutUser, loginUser } = authSlice.actions;
