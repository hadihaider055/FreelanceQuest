import styled from "styled-components";

export const FreelancerSearchInput = styled.div`
    max-width: 100%;
    width: 100%;
    border: 1px solid lightgrey;
    border-radius: 5px;
    height: 60px;
    display: flex;
    flex-direction: row;

    .icon-div {
        height: 60px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-left: 20px;
        font-size: 20px;
        margin-right: 20px;
    }


    input {
        background-color: transparent;
        height: 60px;
        max-width: 100%;
        width: 100%;
        outline: none;
    }

    .button-div {
        height: 60px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-right: 10px;
    }

    button {
        padding-left: 15px;
        padding-right: 15px;
        background: #239852;
        color: white;
        height: 40px;
        border-radius: 5px;
    }

`;

export const FreelancerBox = styled.div`
    max-width: 100%;
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
    border: 1px solid lightgrey;
    border-radius: 5px;

    .freelancer-desc {
        margin-bottom: 15px;
        margin-top: 15px;
    }

    .freelancer-time {
        font-size: 15px;
        font-weight: 400;
        color: grey;
    }
`;

export const FreelancerBoxHeader = styled.div`
    max-width: 100%;
    width: 100%;
    display: flex;
    flex-direction: row;

    img {
        width: 70px;
        min-width: 70px;
        height: 70px;
        max-height: 70px;
        border-radius: 100%;
        margin-right: 15px;
    }

    h3 {
        margin-top: 10px;
    }
`;

export const FreelancerBoxesGrid = styled.div`
    max-width: 100%;
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    column-gap: 20px;
    row-gap: 20px;
`;

export const FreelancerTagContainer = styled.div`
    max-width: 100%;
    width: 100%;
    display: flex;
    flex-direction: row;
`;

export const FreelancerTag = styled.div`
    padding: 5px;
    background-color: rgb(242, 242, 242);
    border-radius: 5px;
    color: black;
    font-weight: 500;
    font-size: 12px;
    margin-right: 5px;
    margin-left: 5px;
`;

export const FreelancerPagination = styled.div`
    display: flex;
    justify-content: center;

    a {
        cursor: pointer;
        color: black;
        float: left;
        padding: 8px 16px;
        text-decoration: none;
        transition: background-color .25s;
    }

    a.active {
        background-color: #0A0A0A;
        color: white;
    }

    a:hover:not(.active) {
        background-color: rgb(242, 242, 242);
    }
`;