import { styled } from "styled-components";

export const ProposalDetailsContainerStyled = styled.section`
    font-family: Inter, sans-serif;
    background-color: rgb(243 244 246);
    padding-bottom: 50px;
    padding-top: 50px;
    height: 1000px;

    h1 {
        font-size: 36px;
        font-weight: 500;
    }

    h2 {
        font-size: 24px;
        font-weight: 500;
    }

    h3 {
        font-size: 18px;
        font-weight: 500;
    }

    hr {
        margin-top: 30px;
        margin-bottom: 30px;
    }
`;

export const ProposalInformationContainer = styled.div`
    border: 1px solid lightgrey;
    border-radius: 15px;
    padding: 30px;
    background-color: white;
    margin-top: 20px;
`;