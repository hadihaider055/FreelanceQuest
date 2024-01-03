import { styled } from "styled-components";

export const JobProposalsContainerStyled = styled.section`
    font-family: Inter, sans-serif;
    // background-color: rgb(243 244 246);
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
`;

export const JobProposalsHeader = styled.div`
    display: flex;
    flex-direction: row;

    h2 {
        max-width: 100%;
        width: 100%;
    }

    .search-bar {
        display: flex;
        flex-direction: row;
        border: 1px solid lightgrey;
        height: 50px;
    }

    .search-bar span.icon {
        font-size: 25px;
        margin-right: 20px;
        margin-left: 20px;
        font-weight: 100;
        height: 50px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        color: lightgrey;
    }

    .search-bar input {
        border: 0px;
        outline: none;
        background-color: transparent;
        height: 50px;
    }

    button {
        background-color: #4e03fc;
        color: white;
        height: 50px;
        margin-left: 10px;
        font-size: 15px;
        width: 150px;
    }

`;

export const JobProposalsTable = styled.table`
    display: grid;
    max-width: 100%;
    width: 100%;

    .data {
        border: 1px solid lightgrey;
    }

    button {
        background-color: #f4f0ff;
        border: 1px solid #4e03fc;
        color: #4e03fc;
        height: 50px;
        margin-left: 10px;
        font-size: 15px;
        width: 150px;
        margin: 0px auto;
        transition: 0.25s;
        height: 40px;
    }

    button:hover {
        background-color: #4e03fc;
        color: white;
    }

    th, td {
        font-weight: 400;
    }

    tr.data-row {
        background-color: white;
    }

    tr.data-row:nth-child(odd) {
        background-color: #f8f7fc;
    }
`;

export const JobProposalsTableHeader = styled.tr`
    border: 1px solid lightgrey;
    max-width: 100%;
    width: 100%;
    height: 50px;
    display: flex;
    margin-bottom: 20px;
    background-color: transparent;

    th {
        display: flex;
        flex-direction: column;
        justify-content: center;
        max-width: 25%;
        width: 100%;
        text-align: center;
        color: grey;
    }

    th .header-row-flex {
        display: flex;
        flex-direction: row;
        justify-content: center;
    }

    th .header-row-flex .icon {
        margin-top: 5px;
        margin-left: 10px;
        cursor: pointer;
    }

`;

export const JobProposalsTableRow = styled.tr`
    max-width: 100%;
    width: 100%;
    height: 70px;
    display: flex;

    .data-row-flex {
        display: flex;
        justify-content: center;
        flex-direction: row;
    }

    .data-row-flex p {
        margin-top: 8px;
    }

    .data-row-flex .icon {
        font-size: 20px;
        margin-right: 10px;
        color: #ffae00;
        margin-top: 1px;
    }

    img {
        border-radius: 100%;
        height: 40px;
        width: 40px;
        min-height: 40px;
        min-width: 40px;
        margin-right: 15px;
    }

    td {
        display: flex;
        flex-direction: column;
        justify-content: center;
        max-width: 25%;
        text-align: center;
        width: 100%;
        color: black;
    }
`;