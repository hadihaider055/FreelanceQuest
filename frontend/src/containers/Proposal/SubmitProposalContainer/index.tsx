// @ts-nocheck

import Container from "@/components/common/Container";
import {
  SubmitProposalBidInput,
  SubmitProposalButton,
  SubmitProposalCategoryContainer,
  SubmitProposalCoverLetterInput,
  SubmitProposalSection,
  SubmitProposalStyled,
} from "./styled";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/utils/hooks/store";
import { useRouter } from "next/router";
import { submitProposal } from "@/store/thunks/proposalThunk";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { getJobByIdThunk } from "@/store/thunks/jobThunk";

const SubmitProposalContainer: React.FC = () => {
  const [coverLetter, setCoverLetter] = useState("");
  const [bidAmount, setBidAmount] = useState("");
  const router = useRouter();
  const dispatch = useAppDispatch();
  const session = useSession();
  const params = useSearchParams();
  const [job, setJob] = useState(null);

  const fetchJob = async (id) => {
    const res = await dispatch(getJobByIdThunk(id));
    return res;
  };

  useEffect(() => {
    const jobId = params.get("job_id");

    if (jobId) {
      fetchJob(jobId).then((res) => setJob(res.payload));
    }
  }, [params]);

  const cancelAction = () => {
    router.push("/proposals");
  };

  const submitProposalAction = () => {
    const jobId = params.get("job_id");

    if (session.data && jobId) {
      dispatch(
        submitProposal({
          job_id: jobId,
          cover_letter: coverLetter,
          proposed_price: bidAmount,
          user_id: session.data.user.id,
        })
      );
    }

    router.push("/");
  };

  return (
    <>
      {job && (
        <SubmitProposalStyled>
          <Container>
            <br />
            <br />
            <h1>Submit a proposal</h1>
            <br />

            <SubmitProposalSection>
              <div className="submit-proposal-section-head">
                <h3>Job details</h3>
              </div>
              <div className="submit-proposal-section-body">
                <h3>{job.title}</h3>
                <br />
                <SubmitProposalCategoryContainer>
                  {job.skills &&
                    job.skills.map((skill) => <div key={skill}>{skill}</div>)}
                </SubmitProposalCategoryContainer>
                <br />
                <p>{job.description}</p>
                <br />
                <p>
                  <a href={`/jobs/${job.id}`}>View job posting</a>
                </p>
              </div>
            </SubmitProposalSection>

            <br />

            <SubmitProposalSection>
              <div className="submit-proposal-section-head">
                <h3>
                  What is the full amount you&apos;d like to bid for this job?
                </h3>
              </div>
              <div className="submit-proposal-section-body">
                <SubmitProposalBidInput
                  onChange={(e) => setBidAmount(e.target.value)}
                  type="number"
                  placeholder="Amount"
                />
              </div>
            </SubmitProposalSection>

            <br />

            <SubmitProposalSection>
              <div className="submit-proposal-section-head">
                <h3>Cover letter</h3>
              </div>
              <div className="submit-proposal-section-body">
                <SubmitProposalCoverLetterInput
                  onChange={(e) => setCoverLetter(e.target.value)}
                  placeholder="Write a cover letter for your proposal"
                />
              </div>
            </SubmitProposalSection>

            <br />

            <SubmitProposalButton onClick={submitProposalAction}>
              Submit
            </SubmitProposalButton>
            <SubmitProposalButton onClick={cancelAction} variant="dark">
              Cancel
            </SubmitProposalButton>

            <br />
            <br />
            <br />
            <br />
          </Container>
        </SubmitProposalStyled>
      )}
    </>
  );
};

export default SubmitProposalContainer;
