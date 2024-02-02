// Redux
import { createAsyncThunk } from "@reduxjs/toolkit";

// Axios
// import axios, { AxiosError } from "axios";
import axiosInstances from "@/config/axios";

// Swal
import Swal from "sweetalert2";

// Config
import { Paths } from "@/config/Paths";
import { RootState } from "..";

type submitProposalArgs = {
  job_id: string;
  cover_letter: string;
  user_id: string;
  proposed_price: string;
};

export const submitProposal = createAsyncThunk(
  "proposal/submitProposal",
  async (data: submitProposalArgs, { dispatch, getState }) => {
    const state = getState() as RootState;

    if (!state.auth.user) {
      throw new Error("User not found");
    }

    try {
      const proposal = await axiosInstances.default.post(
        Paths.default.SUBMIT_PROPOSAL,
        JSON.stringify(data),
        {
          headers: {
            Authorization: `Bearer ${state.auth?.token}`,
          },
        }
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

export const getSubmittedProposals = createAsyncThunk(
  "proposal/get-submitted-proposals",
  async (userId: string, { dispatch, getState }) => {
    const state = getState() as RootState;

    if (!state.auth.user) {
      throw new Error("User not found");
    }

    try {
      const res = await axiosInstances.default.get(
        Paths.default.GET_SUBMITTED_PROPOSALS(userId),
        {
          headers: {
            Authorization: `Bearer ${state.auth?.token}`,
          },
        }
      );

      const proposals = res.data.payload.proposals;

      return proposals;
    } catch (e: any) {
      console.log(e);
      let errorMessage = e.message || "Failed to fetch submitted proposals";
      if (e?.response?.data?.message) {
        errorMessage = e.response.data.message;
        Swal.fire("", `<p>${errorMessage}</p>`, "error");
      }

      throw new Error(errorMessage);
    }
  }
);

export const getProposalById = createAsyncThunk(
  "proposal/get-proposal-by-id",
  async (id: string, { dispatch, getState }) => {
    const state = getState() as RootState;

    if (!state.auth.user) {
      throw new Error("User not found");
    }

    try {
      const res = await axiosInstances.default.get(
        Paths.default.GET_PROPOSAL_BY_ID(id),
        {
          headers: {
            Authorization: `Bearer ${state.auth?.token}`,
          },
        }
      );

      const proposal = res.data.payload.proposal;

      return proposal;
    } catch (e: any) {
      console.log(e);
      let errorMessage = e.message || "Failed to fetch proposal";
      if (e?.response?.data?.message) {
        errorMessage = e.response.data.message;
        Swal.fire("", `<p>${errorMessage}</p>`, "error");
      }

      throw new Error(errorMessage);
    }
  }
);

export const getProposalsByJobId = createAsyncThunk(
  "proposal/get-proposals-by-job-id",
  async (jobId: string, { dispatch, getState }) => {
    const state = getState() as RootState;

    if (!state.auth.user) {
      throw new Error("User not found");
    }

    try {
      const res = await axiosInstances.default.get(
        Paths.default.GET_PROPOSALS_BY_JOB_ID(jobId),
        {
          headers: {
            Authorization: `Bearer ${state.auth?.token}`,
          },
        }
      );

      const proposal = res.data.payload.proposals;

      return proposal;
    } catch (e: any) {
      console.log(e);
      let errorMessage = e.message || "Failed to fetch proposals for job";
      if (e?.response?.data?.message) {
        errorMessage = e.response.data.message;
        Swal.fire("", `<p>${errorMessage}</p>`, "error");
      }

      throw new Error(errorMessage);
    }
  }
);

export const acceptProposalThunk = createAsyncThunk(
  "proposal/accept-proposal",
  async (id: string, { dispatch, getState }) => {
    const state = getState() as RootState;

    if (!state.auth.user) {
      throw new Error("User not found");
    }

    try {
      const res = await axiosInstances.default.get(
        Paths.default.ACCEPT_PROPOSAL(id),
        {
          headers: {
            Authorization: `Bearer ${state.auth?.token}`,
          },
        }
      );

      return res.data.payload;
    } catch (e: any) {
      console.log(e);
      let errorMessage = e.message || "Failed to accept proposal";
      if (e?.response?.data?.message) {
        errorMessage = e.response.data.message;
        Swal.fire("", `<p>${errorMessage}</p>`, "error");
      }

      throw new Error(errorMessage);
    }
  }
);
