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

export const updateProfilePictureThunk = createAsyncThunk(
"auth/signup",
async (data: FormData, { dispatch }) => {
    try {
    const user = await axiosInstances.default.post(Paths.default.UPDATE_PROFILE_PICTURE, data, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });

    Swal.fire("Success", "Profile picture updated successfuly", "success");
    return user;
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