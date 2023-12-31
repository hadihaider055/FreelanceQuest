import { styled } from "styled-components";

export const SubmitProposalStyled = styled.section`
    max-width: 100%;
    width: 100%;
    background-color: rgb(243 244 246);
    height: 100%;
    font-family: Inter, sans-serif;

    a {
        text-decoration: underline;
        color: #239852;
        cursor: pointer;
    }

    h1, h2, h3, p {
        color: black;
    }

    h2 {
        font-size: 24px;
        font-weight: 500;
    }

    h3 {
        font-size: 20.8px;
        font-weight: 500;
    }

    h4 {
        font-size: 16px;
        font-weight: 500;
    }
`;

export const SubmitProposalCategoryContainer = styled.div`
    max-width: 100%;
    width: 100%;
    display: flex;

    div {
        padding: 10px;
        background-color: rgb(242, 242, 242);
        border-radius: 20px;
        color: black;
        font-weight: 400;
        font-size: 14px;
        margin-right: 5px;
        margin-left: 5px;
        padding-top: 5px;
        padding-bottom: 5px;
    }
`;


export const SubmitProposalSection = styled.div`
    background-color: white;
    border-radius: 15px;

    .submit-proposal-section-head {
        padding: 30px;
        border-bottom: 1px solid lightgrey;
    }

    .submit-proposal-section-body {
        padding: 30px;
    }

`;

export const SubmitProposalBidInput = styled.input`
    outline: none;
    background-color: white;
    border: 1px solid lightgrey;
    border-radius: 10px;
    padding: 15px;
    box-sizing: border-box;
`;

export const SubmitProposalCoverLetterInput = styled.textarea`
    max-width: 100%;
    width: 100%;
    background-color: white;
    border: 1px solid lightgrey;
    border-radius: 10px;
    padding: 15px;
    box-sizing: border-box;
    min-height: 250px;
    outline: none;
`;

export const SubmitProposalButton = styled.button<{ variant?: string }>`
    background-color: ${props => props.variant !== "dark" ? "#239852" : "#333333" };
    padding: 10px;
    border-radius: 5px;
    padding-left: 30px;
    padding-right: 30px;
    font-weight: 500;
    font-family: Inter, sans-serif;
    color: white;
    transition: 0.25s;
    margin-right: 15px;
`;
