import Container from "@/components/common/Container";
import { SubmitProposalBidInput, SubmitProposalButton, SubmitProposalCategoryContainer, SubmitProposalCoverLetterInput, SubmitProposalSection, SubmitProposalStyled } from "./styled";

const SubmitProposalContainer: React.FC = () => {
    return <>
        <SubmitProposalStyled>
            <Container>
                <br/><br/>
                <h2 className="font-montserrat">Submit a proposal</h2>
                <br/>

                <SubmitProposalSection>
                    <div className="submit-proposal-section-head">
                        <h3>Job details</h3>
                    </div>
                    <div className="submit-proposal-section-body">
                        <h3>HR Consultant: Career Ladder Development</h3>
                        <br/>
                        <SubmitProposalCategoryContainer>
                            <div>HR</div>
                            <div>Business Development</div>
                        </SubmitProposalCategoryContainer>
                        <br/>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                            Quisquam, repellendus. Lorem ipsum dolor sit amet consectetur 
                            adipisicing elit. Quisquam, repellendus. Lorem ipsum dolor sit 
                            amet consectetur adipisicing elit. Quisquam, repellendus. elit 
                            Quisquam, repellendus. Lorem ipsum dolor sit amet consectetur 
                            adipisicing elit. Quisquam, repellendus. Lorem ipsum dolor sit 
                            amet consectetur adipisicing elit. Quisquam, repellendus.</p>
                        <br/>
                        <p><a href="/jobs/123">View job posting</a></p>
                    </div>
                </SubmitProposalSection>

                <br/>

                <SubmitProposalSection>
                    <div className="submit-proposal-section-head">
                        <h3>What is the full amount you'd like to bid for this job?</h3>
                    </div>
                    <div className="submit-proposal-section-body">
                        <SubmitProposalBidInput type="number" placeholder="Amount" />
                    </div>
                </SubmitProposalSection>

                <br/>

                <SubmitProposalSection>
                    <div className="submit-proposal-section-head">
                        <h3>Cover letter</h3>
                    </div>
                    <div className="submit-proposal-section-body">
                        <SubmitProposalCoverLetterInput placeholder="Write a cover letter for your proposal" />
                    </div>
                </SubmitProposalSection>
                
                <br/>

                <SubmitProposalButton>Submit</SubmitProposalButton>
                <SubmitProposalButton variant="dark">Cancel</SubmitProposalButton>

                <br/><br/><br/><br/>
            </Container>
        </SubmitProposalStyled>
    </>
}

export default SubmitProposalContainer;
