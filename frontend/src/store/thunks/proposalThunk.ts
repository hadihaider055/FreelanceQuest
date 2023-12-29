// Redux
import { createAsyncThunk } from "@reduxjs/toolkit";

// Axios
// import axios, { AxiosError } from "axios";
import axiosInstances from "@/config/axios";

// Swal
import Swal from "sweetalert2";

// Config
import { Paths } from "@/config/Paths";

type submitProposalArgs = {
    job_id: string,
    cover_letter: string,
    user_id: string,
    proposed_price: string,
}

export const submitProposal = createAsyncThunk(
    "chat/submitProposal",
    async (data: submitProposalArgs, { dispatch }) => {
      try {
        const proposal = await axiosInstances.default.post(
          Paths.default.SUBMIT_PROPOSAL,
          JSON.stringify(data)
        );
        Swal.fire("", `<p>Proposal submitted successfuly!</p>`, "success");
        return proposal;
      } catch (e: any) {
        console.log(e);
        let errorMessage = e.message || "Failed to submit proposal";
        if (e?.response?.data?.message) {
          errorMessage = e.response.data.message;
        }

        Swal.fire("", `<p>${errorMessage}</p>`, "error");
        throw new Error(errorMessage);
      }
    }
  );
  