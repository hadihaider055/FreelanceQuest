import styled from "styled-components";

export const JobModalStyled = styled.div`
  width: 800px;
  background-color: #fff;
  padding: 30px;
  border-radius: 15px;

  @media (max-width: ${({ theme }) => theme.breakpoints.ipadpro - 1}px) {
    width: 100%;
  }
`;

export const JobModalHeader = styled.div``;

export const JobModalBody = styled.div``;

export const JobModalFooter = styled.div`
  @media (max-width: ${({ theme }) => theme.breakpoints.ipadpro - 1}px) {
    flex-direction: column;

    .button {
      margin-top: 20px;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile - 1}px) {
    .detail-footer {
      flex-wrap: wrap;
    }
  }
`;
