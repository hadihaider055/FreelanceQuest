// @ts-nocheck

import Container from "@/components/common/Container";
import { ProposalContainerStyled, ProposalDetailsBox, ProposalDetailsBoxLeft } from "./styled";
import { FaArrowCircleRight, FaArrowRight, FaEye } from "react-icons/fa";
import Button from "@/components/common/Button";

const ProposalContainer: React.FC = () => {
    return <>
        <ProposalContainerStyled>
            <Container>
                <br/><br/>
                <h1>Submitted Proposals (5)</h1>
                <br/>

                {[1,2,3].map(e => {
                    return <ProposalDetailsBox>
                        <ProposalDetailsBoxLeft>
                            <p className="text-neutral-500 text-xs font-inter mt-3" style={{ display: "inline-flex" }}>
                                Initiated 15 hours ago | <FaEye style={{marginRight: "5px", marginLeft: "8px", fontSize: "15px"}} /> Viewed by client
                            </p>
                            <h3 className="text-black font-medium font-inter text-xl my-1">
                                Python Django Rest Framework | Part time Job
                            </h3>
                        </ProposalDetailsBoxLeft>
                        <div style={{
                            maxWidth: "150px",
                            whiteSpace: "nowrap",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center"
                        }}>
                            <Button variant="black">
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
}

export default ProposalContainer;
