// @ts-nocheck

import { acceptProposalThunk, getProposalById } from "@/store/thunks/proposalThunk";
import { useAppDispatch } from "@/utils/hooks/store";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AcceptProposalModal, ProposalDetailsContainerStyled, ProposalInformationContainer, ProposedByContainer } from "./styled";
import Container from "@/components/common/Container";
import { SubmitProposalCategoryContainer } from "../SubmitProposalContainer/styled";
import Button from "@/components/common/Button";
import { FaArrowCircleLeft } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { UserRoleEnum } from "@/types/user";
import toast, { Toaster } from "react-hot-toast";

// import Modal from "@/components/common/Modal";
// import { IoCloseOutline } from "react-icons/io5";

const ProposalDetailsContainer: React.FC = () => {

    const dispatch = useAppDispatch();
    const [proposal, setProposal] = useState(null);
    const router = useRouter();
    const session = useSession();
    // const [modalOpen, setModalOpen] = useState(false);

    const fetchProposal = async (id) => {
        const res = await dispatch(getProposalById(id));
        return res;
    }

    const acceptProposal = async () => {
        const proposalId = router.query["id"];

        if (proposalId) {
            const res = await dispatch(acceptProposalThunk(proposalId));

            if (res.payload) {
                router.push(`/messages?chatId=${res.payload.chat.id}`);
            }
        }
    }

    useEffect(() => {
        const proposalId = router.query['id'];

        if (proposalId) {
            fetchProposal(proposalId)
            .then(res => setProposal(res.payload));
        }

    }, [router.query])

    return <>
        <ProposalDetailsContainerStyled>
            {/* {modalOpen && 
            <Modal>
                <AcceptProposalModal>
                <div className="w-full flex justify-between">
                    <h3 className="font-inter text-xl font-semibold text-black">
                        Accept Proposal
                    </h3>
                    <div
                        className="cursor-pointer w-10 h-10 flex items-center justify-center rounded-xl"
                        onClick={() => setModalOpen(false)}
                    >
                    <IoCloseOutline fontSize={28} />
                    </div>
                </div>
                </AcceptProposalModal>
            </Modal>} */}
            <Container>
                <h1>Proposal Details</h1>
                <Toaster />
                {proposal &&
                    <ProposalInformationContainer>
                        <h2>{proposal.Job.title}</h2>
                        <SubmitProposalCategoryContainer style={{ marginTop: "20px", marginBottom: "20px"}} >
                            {proposal.Job.skills.map(skill => <div>{skill}</div>)}
                        </SubmitProposalCategoryContainer>
                        <p>{proposal.Job.description}</p>

                        <hr/>

                        <h2>{session?.data?.user.role === UserRoleEnum.CLIENT ? "Proposed Terms" : "Your Proposed Terms"}</h2>
                        <p>Total price of project: {proposal.proposed_price}</p>

                        <hr/>

                        <h2>Cover Letter</h2>
                        <p>{proposal.cover_letter}</p>
                    </ProposalInformationContainer>    
                }
                {session?.data?.user.role === UserRoleEnum.CLIENT &&
                <>
                    <ProposedByContainer>
                        <img src={proposal.User.profileImage} />
                        <p>Proposed by {`${proposal.User.firstName} ${proposal.User.lastName}`}</p>
                    </ProposedByContainer>
                </>}
                <div style={{ 
                        maxWidth: "350px",
                        whiteSpace: "nowrap",
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        columnGap: "10px",
                        marginTop: "30px" }}>
                    <Button onClick={() => {
                        router.push(`/proposals/`);
                    }} variant="black">
                        <span style={{ display: "inline-flex" }}>
                            <FaArrowCircleLeft style={{ marginRight: "8px" }} /> Back
                        </span>
                    </Button>
                    {session?.data?.user.role === UserRoleEnum.CLIENT &&
                    <Button onClick={acceptProposal} variant="blue">
                        <span style={{ display: "inline-flex" }}>
                            Accept Proposal
                        </span>
                    </Button>
                    }
                </div>
            </Container>

        </ProposalDetailsContainerStyled>
    </>
}

export default ProposalDetailsContainer;
