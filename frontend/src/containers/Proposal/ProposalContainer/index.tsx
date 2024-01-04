// @ts-nocheck

import Container from "@/components/common/Container";
import {
  ProposalContainerStyled,
  ProposalDetailsBox,
  ProposalDetailsBoxLeft,
} from "./styled";
import { FaArrowCircleRight, FaArrowRight, FaEye } from "react-icons/fa";
import Button from "@/components/common/Button";
import { useAppDispatch } from "@/utils/hooks/store";
import { useEffect, useState } from "react";
import { getSubmittedProposals } from "@/store/thunks/proposalThunk";
import { useSession } from "next-auth/react";
import moment from "moment";
import { useRouter } from "next/router";
import { Player } from "@lottiefiles/react-lottie-player";
import PageBucket from "../../../../public/images/proposals/PageBucket.json";

const ProposalContainer: React.FC = () => {
  const dispatch = useAppDispatch();
  const [proposals, setProposals] = useState([]);
  const session = useSession();
  const router = useRouter();

  const fetchProposals = async (userId) => {
    const res = await dispatch(getSubmittedProposals(userId));
    return res;
  };

  useEffect(() => {
    if (session?.data?.user.id) {
      fetchProposals(session.data.user.id).then((res) =>
        setProposals(res.payload)
      );
    }
  }, [session]);

  return (
    <>
        <ProposalContainerStyled>
            <Container>
                <br/><br/>
                <h1>Submitted Proposals ({proposals.length})</h1>
                <br/>
                { proposals.length <= 0 &&
                <>

                    <div className="items-center justify-center">
                        <Player
                        autoplay
                        loop
                        src={PageBucket}
                        style={{ height: "300px", width: "300px" }}
                        />
                        <p style={{ textAlign: "center" }}>You haven't sent any proposals yet.</p>
                    </div>
                </> }
                {proposals.map(proposal => {
                    return <ProposalDetailsBox>
                        <ProposalDetailsBoxLeft>
                            <p className="text-neutral-500 text-xs font-inter mt-3" style={{ display: "inline-flex" }}>
                                Initiated {moment(proposal.createdAt).startOf("hour").fromNow()} | <FaEye style={{marginRight: "5px", marginLeft: "8px", fontSize: "15px"}} /> Viewed by client
                            </p>
                            <h3 className="text-black font-medium font-inter text-xl my-1">
                                {proposal.Job.title}
                            </h3>
                        </ProposalDetailsBoxLeft>
                        <div style={{
                            maxWidth: "150px",
                            whiteSpace: "nowrap",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center"
                        }}>
                            <Button onClick={() => {
                                router.push(`/proposals/${proposal.id}`);
                            }} variant="black">
                                <span style={{ display: "inline-flex" }}>
                                    View Details <FaArrowCircleRight style={{ marginLeft: "8px" }} />
                                </span>
                            </Button>
                        </div>
                    </ProposalDetailsBox>
                })}

                <br/>
            </Container>
        </ProposalContainerStyled>
    </>
  );
};

export default ProposalContainer;
