import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Thunks
import {
  deleteProfilePictureThunk,
  signupThunk,
  loginThunk,
  logoutThunk,
  updateProfilePictureThunk,
  updateUserProfileThunk,
} from "../thunks/authThunk";

// Utils
import { ActionTracker, initialActionTracker } from "../utils";

// Types
import { User } from "../../types/user";

type AuthState = {
  login: ActionTracker;
  signup: ActionTracker;
  logout: ActionTracker;
  updateProfilePicture: ActionTracker;
  deleteProfilePicture: ActionTracker;
  updateUserProfile: ActionTracker;

  user: User | null;
  token: string | null;
};

const initialState: AuthState = {
  login: initialActionTracker,
  signup: initialActionTracker,
  logout: initialActionTracker,
  updateProfilePicture: initialActionTracker,
  deleteProfilePicture: initialActionTracker,
  updateUserProfile: initialActionTracker,

  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.user = null;
    },
    loginUser: (
      state,
      {
        payload,
      }: PayloadAction<{
        user: User;
        token: string;
      }>
    ) => {
      state.user = payload.user;
      state.token = payload.token;
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
    builder.addCase(signupThunk.pending, (state) => {
      state.signup = {
        ...initialActionTracker,
        isLoading: true,
      };
    });
    builder.addCase(signupThunk.fulfilled, (state, { payload }) => {
      state.signup = {
        ...initialActionTracker,
        isSuccess: true,
        successMessage: "Logged in successfully",
      };
    });

    builder.addCase(signupThunk.rejected, (state, { error }) => {
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

    // Delete Profile Picture
    builder.addCase(deleteProfilePictureThunk.pending, (state) => {
      state.deleteProfilePicture = {
        ...initialActionTracker,
        isLoading: true,
      };
    });
    builder.addCase(deleteProfilePictureThunk.fulfilled, (state, action) => {
      state.deleteProfilePicture = {
        ...initialActionTracker,
        isSuccess: true,
        successMessage: "Profile picture updated successfully",
      };

      state.user = action.payload;
    });
    builder.addCase(deleteProfilePictureThunk.rejected, (state, { error }) => {
      state.deleteProfilePicture = {
        ...initialActionTracker,
        isError: true,
        errorMessage: error.message || "",
      };
    });

    // Update User Profile
    builder.addCase(updateUserProfileThunk.pending, (state) => {
      state.updateUserProfile = {
        ...initialActionTracker,
        isLoading: true,
      };
    });
    builder.addCase(updateUserProfileThunk.fulfilled, (state, action) => {
      state.updateUserProfile = {
        ...initialActionTracker,
        isSuccess: true,
        successMessage: "Profile picture updated successfully",
      };

      state.user = action.payload;
    });
    builder.addCase(updateUserProfileThunk.rejected, (state, { error }) => {
      state.updateUserProfile = {
        ...initialActionTracker,
        isError: true,
        errorMessage: error.message || "",
      };
    });
  },
});

export default authSlice.reducer;
export const { logoutUser, loginUser } = authSlice.actions;
